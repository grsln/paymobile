import React, { useContext } from "react";
import { PaymentContext } from "../context/paymentContext";
import apiservice from "../service/apiservice";
import StatusIcon from "./StatusIcon";
import s from "../styles/ConfirmPage.module.css";

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
    <div className={s.root}>
      <div className={s.wrap}>
        <button
          className={s.back}
          onClick={() => paymentContext?.prevStep()}
        ></button>
        <div className={s.main}>
          <div className={s.title}>Подтверждение платежа</div>
          <div className={s.lineWrap}>
            <div className={s.text}>Оператор: </div>
            <div className={s.text}>{operator && operator.operator}</div>
          </div>
          <div className={s.lineWrap}>
            <div className={s.text}>Номер телефона: </div>
            <div className={s.text}>{paymentContext?.getFormattedPhone()}</div>
          </div>
          <button
            className={s.button}
            onClick={status === "OK" ? handleSuccess : handleConfirm}
            disabled={status === "Process"}
          >
            <div className={status ? s.btnWrapIcon : s.btnWrap}>
              <StatusIcon status={status} />
              <div className={s.buttonText}>{messageButton()}</div>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmPage;
