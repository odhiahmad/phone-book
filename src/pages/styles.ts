import { colors } from "@/styles/variables";
import styled from "@emotion/styled";

const Pagination = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 20px;

  button {
    background: ${colors.main};
    color: #fff;
    border: none;
    border-radius: 5px;
    padding: 10px 15px;
    cursor: pointer;
    transition: background 0.3s ease;

    &:hover {
      background: ${colors.second};
    }
  }
`;

const ContactListContainer = styled.div`
  max-width: 600px;
  margin: 0 auto;
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const FontHeader = styled.p`
  color: ${colors.black50};
  font-size: 16px;
  font-weight: bold;
`;

export { Pagination, ContactListContainer, FontHeader };
