import { useState, useEffect, CSSProperties } from "react";
import TopBar from "@/components/atoms/topbar";
import FloatingButton from "@/components/atoms/floatbutton";
import ContactList from "@/components/contact/ContactList";
import SearchBox from "@/components/atoms/search";
import { useMutation } from "@apollo/client";
import { DELETE_CONTACT_QUERY } from "@/queries";
import { Pagination, ContactListContainer } from "@/styles/styles";
import { DELETE_CONTACT } from "@/context/contact/types";
import { useAppContext } from "@/context/AppProvider";
import { useRouter } from "next/router";
import { UserData } from "@/utils/interface";
import FormAddNumber from "@/components/contact/FormAddNumber";
import FormEditNumber from "@/components/contact/FormEditNumber";
import FormEditContact from "@/components/contact/FormEditContact";

export default function Home() {
  const override: CSSProperties = {
    display: "block",
    margin: "0 auto",
    borderColor: "red",
  };

  const router = useRouter();
  const limit = 10;
  const [currentPage, setCurrentPage] = useState(1);
  const [offset, setOffset] = useState(0);
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);
  const [openAddNumber, setOpenAddNumber] = useState(false);
  const [openEditNumber, setOpenEditNumber] = useState(false);
  const [openEditContact, setOpenEditContact] = useState(false);
  const [number, setNumber] = useState("");
  const [id, setId] = useState(0);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [loadingDelete, setLoadingDelete] = useState(false);
  const [mutation] = useMutation(DELETE_CONTACT_QUERY);
  const { dispatch } = useAppContext();

  useEffect(() => {
    setOffset((currentPage - 1) * limit);
  }, [currentPage, limit]);

  const handleSearch = (searchTerm: string) => {
    setSearch(searchTerm);
    setCurrentPage(1);
    setOffset(0);
  };

  const handleDelete = async (id: number) => {
    setLoadingDelete(true);
    try {
      const { data } = await mutation({
        variables: {
          id: id,
        },
      });
      dispatch({ type: DELETE_CONTACT, payload: data.delete_contact_by_pk.id });
      setLoadingDelete(false);
    } catch (error) {
      setLoadingDelete(false);
    }
  };

  const handleChangeNumber = (id: number, number: string) => {
    setNumber(number);
    setId(id);
    setOpenEditNumber(true);
  };

  const handleAddNumber = (value: UserData) => {
    setOpenAddNumber(true);
    setId(value.id);
  };

  const handleEditContact = (value: UserData) => {
    setOpenEditContact(true);
    setId(value.id);
    setFirstName(value.first_name);
    setLastName(value.last_name);
  };

  const handleOnCloseAddNumber = () => {
    setOpenAddNumber(false);
  };

  const handleOnCloseEditNumber = () => {
    setOpenEditNumber(false);
  };

  const handleOnCloseEditContact = () => {
    setOpenEditContact(false);
  };

  return (
    <>
      <ContactListContainer>
        <TopBar title="List Contact" />
        <SearchBox onSearch={handleSearch} />
        <FloatingButton url="create-contact" />
        <FormAddNumber
          isOpen={openAddNumber}
          onClose={handleOnCloseAddNumber}
          id={id}
        />
        <FormEditNumber
          isOpen={openEditNumber}
          onClose={handleOnCloseEditNumber}
          id={id}
          number={number}
        />
        <FormEditContact
          isOpen={openEditContact}
          onClose={handleOnCloseEditContact}
          id={id}
          firstName={firstName}
          lastName={lastName}
        />
        <ContactList
          limit={limit}
          offset={offset}
          search={search}
          handleDelete={handleDelete}
          handleChange={handleEditContact}
          handleAdd={handleAddNumber}
          handleChangeNumber={handleChangeNumber}
        />

        <Pagination>
          <button
            onClick={() => setCurrentPage((prevPage) => prevPage - 1)}
            disabled={currentPage === 1}
          >
            Previous Page
          </button>
          <button onClick={() => setCurrentPage((prevPage) => prevPage + 1)}>
            Next Page
          </button>
        </Pagination>
      </ContactListContainer>
    </>
  );
}
