import styled from "@emotion/styled/macro";

const HalfModal = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background: white;
  height: 50%;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  box-shadow: 0px -5px 5px rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const ModalContent = styled.div`
  padding: 20px;
`;

export { HalfModal, ModalContent };
