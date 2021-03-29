import { useContext, useState } from "react";
import { PaymentContext } from "../context/paymentContext";
import s from "../styles/AmountInput.module.css";

const MAXAMOUNT = 1000;
const MINAMOUNT = 1;

const AmountInput = () => {
  const paymentContext = useContext(PaymentContext);
  const [isCorrectAmount, setCorrectAmountState] = useState(
    () => paymentContext?.amount !== null
  );
  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const intAmount = +e.target.value.replace(/\D+/g, "");
    if (intAmount <= MAXAMOUNT && intAmount >= MINAMOUNT) {
      paymentContext?.setAmount(intAmount);
      setCorrectAmountState(true);
    } else if (intAmount <= MAXAMOUNT) {
      setCorrectAmountState(false);
      paymentContext?.setAmount(null);
    }
  };
  return (
    <div className={s.main}>
      <label htmlFor="amount">Сумма платежа (руб.):</label>
      <input
        className={s.input}
        id="amount"
        onChange={handleAmountChange}
        value={paymentContext?.getAmount()}
      />
      <small className={isCorrectAmount ? s.correct : s.notcorrect}>
        Сумма платежа от 1 до 1 000 рублей.
      </small>
    </div>
  );
};

export default AmountInput;
