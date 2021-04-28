import React, { useContext } from "react";
import { PaymentContext } from "../context/paymentContext";
import AmountInput from "./AmountInput";
import PhoneInput from "./PhoneInput";
import Image from "next/image";
import styled from "styled-components";
import ButtonBack from "./ButtonBack";

const Root = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100vh;
`;
const Wrap = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  @media only screen and (max-device-width: 480px) {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
`;
const Main = styled.form`
  display: flex;
  flex-direction:column;
  align-items: center;
  justify-content: flex-start;
  width: 50%;
  min-width: 250px;
  height: 50%;
  min-height: 350px;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.14);
  border-radius: 10px;
  background-color: #fff;
  padding: 1rem;
`;
const Operator = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin: 10px 20px;
  align-self: center;
`;
const OperatorName = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 2rem;
  margin: 1rem;
`;
const Button = styled.button`
  background: linear-gradient(to bottom, #ff9810, #ff8300);
  box-shadow: 0 10px 15px 0 rgb(255 140 0 / 20%);
  color: #fff;
  height: 58px;
  min-width: 200px;
  font-size: 19px;
  border-radius: 29px;
  width: 30%;
  border: none;
  margin: 0;
  outline: none;
  padding: 0.5rem;
  text-align: center;
  cursor: pointer;
  &:active {
    margin-top: 4px;
    margin-bottom: -4px;
  }
  &:hover {
    box-shadow: 0 10px 15px 0 rgb(255 140 0 / 60%);
  }
`;
const PhoneAmountPage = () => {
  const paymentContext = useContext(PaymentContext);
  const handleSubmit = (e:React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (
      paymentContext &&
      paymentContext.phoneNumber !== null &&
      paymentContext.phoneNumber >= 70000000000 &&
      paymentContext?.amount !== null
    )
      paymentContext?.nextStep();
  };
  const operator = paymentContext && paymentContext.operator;
  return (
    <Root>
      <Wrap>
        <ButtonBack />
        <Main onSubmit={handleSubmit}>
          <Operator>
            <Image
              src={operator.logoPath}
              alt="logo"
              width={100}
              height={100}
            />
            <OperatorName>{operator?.operator}</OperatorName>
          </Operator>
          <PhoneInput />
          <AmountInput />
          <Button type='submit'>Продолжить</Button>
        </Main>
      </Wrap>
    </Root>
  );
};

export default PhoneAmountPage;
