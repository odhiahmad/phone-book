import TopBar from "@/components/atoms/topbar";
import { FormContact } from "@/components/contact/FormContact";
import styled from "@emotion/styled";

const Container = styled.div`
  max-width: 600px;
  margin: 0 auto;
  background-color: #f0f0f0;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

export default function CreateContact() {
  return (
    <Container>
      <title>Create Contact</title>
      <TopBar title="Create Contact" />
      <FormContact />
    </Container>
  );
}
