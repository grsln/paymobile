import { useContext } from "react";
import { PaymentContext } from "../context/paymentContext";
import AmountInput from "./AmountInput";
import PhoneInput from "./PhoneInput";
import Image from "next/image";
import s from "../styles/PhoneAmountPage.module.css";

const PhoneAmountPage = () => {
  const paymentContext = useContext(PaymentContext);
  const handleClickButton = () => {
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
    <div className={s.root}>
      <div className={s.wrap}>
        <button
          className={s.back}
          onClick={() => paymentContext?.prevStep()}
        ></button>
        <div className={s.main}>
          <div className={s.operator}>
            <Image
              src={operator.logoPath}
              alt="logo"
              width={100}
              height={100}
            />
            <div className={s.operatorName}>{operator?.operator}</div>
          </div>
          <PhoneInput />
          <AmountInput />
          <button className={s.button} onClick={handleClickButton}>
            Продолжить
          </button>
        </div>
      </div>
    </div>
  );
};

export default PhoneAmountPage;
