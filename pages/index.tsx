import Head from "next/head";
import React, { useState } from "react";
import ConfirmPage from "../components/ConfirmPage";
import OperatorPage from "../components/OperatorPage";
import PhoneAmountPage from "../components/PhoneAmountPage";
import {
  IOperator,
  PaymentContext,
  Steps,
  TStatus,
} from "../context/paymentContext";

export default function Home() {
  const [step, setStep] = useState<Steps>(Steps.operator);
  const [operator, setOperator] = useState<IOperator | null>(null);
  const [phone, setPhone] = useState<number | null>(null);
  const [amount, setAmount] = useState<number | null>(null);
  const [status, setStatus] = useState<TStatus | null>(null);
  const getComponent = (step: Steps) => {
    switch (step) {
      case Steps.operator:
        return <OperatorPage />;
      case Steps.phone:
        return <PhoneAmountPage />;
      case Steps.confirm:
        return <ConfirmPage />;
      default:
        return <OperatorPage />;
    }
  };
  const handleNextStep = () => {
    setStep((prevState) => {
      return (prevState + 1) % 3;
    });
  };
  const handlePrevStep = () => {
    setStep((prevState) => {
      return prevState > 0 ? prevState - 1 : prevState;
    });
    setStatus(null);
  };
  const handleSetOperator = (operator: IOperator) => {
    setOperator(operator);
  };
  const handleSetAmount = (amount: number | null) => {
    setAmount(amount);
  };
  const handleSetPhone = (phone: number) => {
    setPhone(phone);
  };
  const handleSetStatus = (status: TStatus) => {
    setStatus(status);
  };
  const handleClearContext = () => {
    setStep(Steps.operator);
    setOperator(null);
    setPhone(null);
    setAmount(null);
    setStatus(null);
  };
  const formatNumberToPhone = () => {
    if (phone) {
      const strNum = "" + phone;
      var lenPhone = strNum.length;
      var arrPhoneChars = strNum.split("");
      if (lenPhone === 11) {
        arrPhoneChars.splice(0, 0, "+");
        arrPhoneChars.splice(2, 0, "(");
        arrPhoneChars.splice(6, 0, ")");
        arrPhoneChars.splice(10, 0, "-");
        arrPhoneChars.splice(13, 0, "-");
        return arrPhoneChars.join("");
      } else return strNum;
    } else return "";
  };
  const handleGetAmount = () => {
    if (amount) {
      return "" + amount;
    } else return "";
  };

  return (
    <>
      <Head>
        <title>Оплата мобильной связи</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <PaymentContext.Provider
        value={{
          operator: operator,
          step: step,
          phoneNumber: phone,
          amount: amount,
          status: status,
          nextStep: handleNextStep,
          prevStep: handlePrevStep,
          setOperator: handleSetOperator,
          setAmount: handleSetAmount,
          setPhone: handleSetPhone,
          setStatus: handleSetStatus,
          clearContext: handleClearContext,
          getFormattedPhone: formatNumberToPhone,
          getAmount: handleGetAmount,
        }}
      >
        {getComponent(step)}
      </PaymentContext.Provider>
    </>
  );
}
