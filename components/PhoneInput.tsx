import { useState } from "react";
import { useContext } from "react";
import InputMask from "react-input-mask";
import { PaymentContext } from "../context/paymentContext";
import s from "../styles/PhoneInput.module.css";

const PhoneInput = () => {
  const paymentContext = useContext(PaymentContext);
  const [isCorrectNumber, setCorrectNumberState] = useState(
    () => paymentContext?.phoneNumber !== null
  );
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const phone = +e.target.value.replace(/\D+/g, "");
    paymentContext?.setPhone(phone);
    setCorrectNumberState(false);
    if (phone >= 70000000000) {
      setCorrectNumberState(true);
    }
  };
  return (
    <div className={s.main}>
      <label htmlFor="phone">Номер телефона:</label>
      <InputMask
        className={s.input}
        mask="+7(999)999-99-99"
        maskPlaceholder={null}
        onChange={handleChange}
        value={paymentContext?.getFormattedPhone()}
      />
      <small className={isCorrectNumber ? s.correct : s.notcorrect}>
        Введите номер в формате: +7(123)456-78-90
      </small>
    </div>
  );
};

export default PhoneInput;
