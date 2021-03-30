import { useContext } from "react";
import styled from "styled-components";
import { PaymentContext } from "../context/paymentContext";

const Button = styled.button`
  border: 0;
  border-radius: 5px;
  padding: 10px;
  margin: 0 10px;
  align-self: flex-start;
  cursor: pointer;
  border-radius: 10px;
  background-color: #fff;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.14);
  transition: box-shadow 120ms cubic-bezier(0.4, 0, 0.2, 1);

  &:hover {
    outline: none;
    box-shadow: 0 2px 15px 0 rgba(0, 0, 0, 0.1);
    color: black;
  }
  &::after {
    content: "<";
  }
  @media only screen and (max-device-width: 480px) {
    border: 0;
    padding: 10px 1rem;
    margin: 5px 10px;
    border-radius: 10px;
    align-self: center;
    width: 50%;
    min-width: 282px;
    &::after {
      content: "Назад";
    }
  }
`;
const ButtonBack = () => {
  const paymentContext = useContext(PaymentContext);
  return (
    <>
      <Button onClick={() => paymentContext?.prevStep()}></Button>
    </>
  );
};

export default ButtonBack;
