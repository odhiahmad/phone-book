import React, { useEffect } from "react";
import { useQuery } from "@apollo/client";
import { GET_CONTACT_QUERY } from "@/queries";
import { useAppContext } from "@/context/AppProvider";
import {
  Container,
  ContactItem,
  Avatar,
  AvatarInfo,
  ContactName,
  ContactInfo,
  DeleteButton,
  ContactHeader,
  Tags,
  ContainerHeader,
  IconX,
  NumberInfo,
  Button,
} from "./styles";
import { GET_CONTACT } from "@/context/contact/types";
import { capitalizeSentence, limitCharacter } from "@/utils";
import { UserData } from "@/interface";

interface ContactProps {
  limit: number;
  offset: number;
  search: string;
  handleDelete: (id: number) => void;
  handleChange: (data: UserData) => void;
  handleAdd: (data: UserData) => void;
  handleChangeNumber: (id: number, number: string) => void;
}

function ContactList({
  limit,
  offset,
  search,
  handleDelete,
  handleChange,
  handleAdd,
  handleChangeNumber,
}: ContactProps) {
  const { state, dispatch } = useAppContext();

  const { loading, error, data } = useQuery(GET_CONTACT_QUERY, {
    variables: {
      limit: limit,
      offset: offset,
      where: {
        first_name: { _like: `%${search}%` },
      },
    },
  });

  useEffect(() => {
    if (!loading && !error) {
      dispatch({ type: GET_CONTACT, payload: data.contact });
    }
  }, [loading, error, data, dispatch]);

  return (
    <Container>
      {state.contact
        ? state.contact.map((user: any) => (
            <ContactItem key={user.id}>
              <ContainerHeader>
                <ContactHeader>
                  <div>
                    <Avatar>
                      <AvatarInfo className="contact-name">
                        {capitalizeSentence(
                          limitCharacter(user.first_name.charAt(0))
                        )}
                      </AvatarInfo>
                    </Avatar>
                  </div>
                  <div>
                    <ContactName className="contact-name">
                      {capitalizeSentence(user.first_name)}
                    </ContactName>
                    <ContactName className="contact-name">
                      {capitalizeSentence(user.last_name)}
                    </ContactName>
                  </div>
                </ContactHeader>
                <ContainerHeader>
                  <Button onClick={() => handleAdd(user)}>Add</Button>
                  <Button onClick={() => handleChange(user)}>Edit</Button>
                  <DeleteButton onClick={() => handleDelete(user.id)}>
                    <IconX>X</IconX>
                  </DeleteButton>
                </ContainerHeader>
              </ContainerHeader>
              {user.phones.map((phones: any, index: number) => (
                <ContactInfo className="contact-phone" key={index}>
                  <Tags>
                    <NumberInfo>{phones.number}</NumberInfo>
                    <Button
                      onClick={() => handleChangeNumber(user.id, phones.number)}
                    >
                      Change Number
                    </Button>
                  </Tags>
                </ContactInfo>
              ))}
            </ContactItem>
          ))
        : null}
    </Container>
  );
}

export default ContactList;
