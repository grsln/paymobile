import React, { useContext } from "react";
import styled from "styled-components";
import { PaymentContext, TStatus } from "../context/paymentContext";
import apiservice from "../service/apiservice";
import ButtonBack from "./ButtonBack";
import StatusIcon from "./StatusIcon";

const Root = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100vh;
  padding: 1rem;
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
const Main = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 50%;
  min-width: 350px;
  height: 50%;
  min-height: 250px;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.14);
  border-radius: 10px;
  background-color: #fff;
  padding: 1rem;
  @media only screen and (max-device-width: 480px) {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 50%;
    min-width: 250px;
    height: 50%;
    min-height: 250px;
    box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.14);
    border-radius: 10px;
    background-color: #fff;
    padding: 1rem;
  }
`;
const Operator = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin: 20px;
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
  height: 68px;
  min-width: 220px;
  font-size: 19px;
  border-radius: 34px;
  width: 30%;
  border: none;
  margin: 0;
  outline: none;
  padding: 0.5rem;
  cursor: pointer;
  &:active {
    margin-top: 4px;
    margin-bottom: -4px;
  }
  &:hover {
    box-shadow: 0 10px 15px 0 rgb(255 140 0 / 60%);
  }
`;
const Title = styled.div`
  font-size: 1.75rem;
  text-align: center;
`;
const Text = styled.div`
  font-size: 1.25rem;
`;

const ButtonWrap = styled.div<{ status: TStatus }>`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: ${(props) =>
    props.status === null ? "center" : "flex-start"};
`;
const ButtonText = styled.div`
  padding-left: 1rem;
`;
const LineWrap = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-self: flex-start;
  line-height: 3rem;
  padding-left: 3rem;
`;
const ConfirmPage = () => {
  const paymentContext = useContext(PaymentContext);
  const operator = paymentContext && paymentContext.operator;
  const status = paymentContext ? paymentContext.status : null;

  const handleConfirm = () => {
    paymentContext?.setStatus("Process");
    apiservice
      .request()
      .then((value) => {
        const response = value as { status: "OK" | "Error" };
        if (response.status === "OK") paymentContext?.setStatus("OK");
        if (response.status === "Error") paymentContext?.setStatus("Error");
      })
      .catch(() => paymentContext?.setStatus("Error"));
  };
  const handleSuccess = () => {
    paymentContext?.clearContext();
  };
  const messageButton = () => {
    if (status === "Error") {
      return "Повторить";
    } else if (status === "OK") {
      return "Платеж выполнен";
    }
    return `Оплатить ${paymentContext?.amount}руб.`;
  };

  return (
    <Root>
      <Wrap>
        <ButtonBack />
        <Main>
          <Title>Подтверждение платежа</Title>
          <LineWrap>
            <Text>Оператор: </Text>
            <Text>{operator && operator.operator}</Text>
          </LineWrap>
          <LineWrap>
            <Text>Номер телефона: </Text>
            <Text>{paymentContext?.getFormattedPhone()}</Text>
          </LineWrap>
          <Button
            onClick={status === "OK" ? handleSuccess : handleConfirm}
            disabled={status === "Process"}
          >
            <ButtonWrap status={status}>
              <StatusIcon status={status} />
              <ButtonText>{messageButton()}</ButtonText>
            </ButtonWrap>
          </Button>
        </Main>
      </Wrap>
    </Root>
  );
};

export default ConfirmPage;
