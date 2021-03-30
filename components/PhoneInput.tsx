import { useState } from "react";
import { useContext } from "react";
import InputMask from "react-input-mask";
import styled from "styled-components";
import { PaymentContext } from "../context/paymentContext";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
`;
const Input = styled(InputMask)`
  font-family: "Roboto", sans-serif;
  font-size: 28px;
  border: 0;
  border-bottom: 2px solid rgba(0, 0, 0, 0.2);
  &:active,
  &:focus {
    outline: 0;
    outline-offset: 0;
    border: 0;
    border-bottom: 2px solid #ff8c00;
  }
`;
const SmallText = styled.small<{ correct: boolean }>`
  color: ${(props) => (props.correct === true ? "#25ae88" : "#d75a4a")};
`;

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
    <Wrapper>
      <label htmlFor="phone">Номер телефона:</label>
      <Input
        mask="+7(999)999-99-99"
        maskPlaceholder={null}
        maskChar={null}
        onChange={handleChange}
        value={paymentContext?.getFormattedPhone()}
      />
      <SmallText correct={isCorrectNumber}>
        Введите номер в формате: +7(123)456-78-90
      </SmallText>
    </Wrapper>
  );
};

export default PhoneInput;
