import { useContext, useState } from "react";
import { PaymentContext } from "../context/paymentContext";
import styled from "styled-components";

const MAXAMOUNT = 1000;
const MINAMOUNT = 1;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
`;
const Input = styled.input`
  font-family: "Roboto", sans-serif;
  font-size: 28px;
  border: 0;
  border-bottom: 2px solid rgba(0,0,0,0.2);
  &:active, &:focus {
  outline: 0;
  outline-offset: 0;
  border: 0;
  border-bottom: 2px solid #ff8c00;
}
`;
const SmallText = styled.small<{correct:boolean}>`
  color: ${props=>(props.correct===true?'#25ae88':'#d75a4a')};
`;

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
    <Wrapper>
      <label htmlFor="amount">Сумма платежа (руб.):</label>
      <Input
        id="amount"
        onChange={handleAmountChange}
        value={paymentContext?.getAmount()}
      />
      <SmallText correct={isCorrectAmount}>
        Сумма платежа от 1 до 1 000 рублей.
      </SmallText>
    </Wrapper>
  );
};

export default AmountInput;
