import styled from "@emotion/styled";
import { colors } from "@/styles/variables";

const Container = styled.ul`
  list-style: none;
  padding: 0;
`;

const ContactItem = styled.li`
  background: ${colors.white100};
  border: 1px solid #ddd;
  border-radius: 5px;
  margin: 10px 0;
  padding: 10px;
  cursor: pointer;

  &:hover {
    background: #eee;
  }
`;

const Avatar = styled.div`
  width: 70px;
  height: 70px;
  border-radius: 50%;
  background-color: ${colors.main};
  margin-right: 10px;
  display: table;
`;

const AvatarInfo = styled.p`
  color: ${colors.white100};
  font-size: 20px;
  margin: 0;
  text-align: center;
  vertical-align: middle;
  display: table-cell;
`;

const ContactName = styled.h2`
  color: black;
  font-size: 18px;
`;

const ContactInfo = styled.p`
  color: #777;
  font-size: 16px;
  margin-vertical: 10px;
`;

const DeleteButton = styled.button`
  background-color: #ff5733;
  color: #fff;
  border: none;
  border-radius: 50%;
  width: 30px;
  height: 30px;
  font-size: 18px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;

const ContactHeader = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;

const ContainerHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const Tags = styled.div`
  background-color: ${colors.main};
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  margin-top: 5px;
`;

const IconX = styled.span`
  content: "X";
`;
export {
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
};
