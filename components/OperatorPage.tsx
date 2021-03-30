import { useContext } from "react";
import { IOperator, PaymentContext } from "../context/paymentContext";
import Image from "next/image";
import styled from "styled-components";

export const OPERATORS: IOperator[] = [
  {
    id: 1,
    operator: "МТС",
    logoPath: "/mts.png",
    logo: "MTSLogo",
  },
  {
    id: 2,
    operator: "МегаФон",
    logoPath: "/megafon.png",
    logo: "MegaFonLogo",
  },
  {
    id: 3,
    operator: "Билайн",
    logoPath: "/beeline.png",
    logo: "BeelineLogo",
  },
];
const Title = styled.div`
  font-size: 2rem;
  text-align: center;
  margin: 1rem;
  @media only screen and (max-device-width: 480px) {
    font-size: 1.25rem;
  }
`;
const Cards = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  flex-wrap: wrap;
  @media only screen and (max-device-width: 480px) {
    flex-direction: column;
    align-items: center;
  }
`;
const Card = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: calc(20% - 16px);
  min-width: 100px;
  min-height: 200px;
  margin: 8px;
  cursor: pointer;
  border: 0;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.14);
  transition: box-shadow 300ms ease, transform 300ms ease;
  border-radius: 10px;
  background-color: #fff;
  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 12px 18px 0 rgba(0, 0, 0, 0.1);
  }
  @media only screen and (max-device-width: 480px) {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    width: 80%;
    min-width: 200px;
    min-height: 100px;
  }
`;
const Logo = styled.div`
  width: 72px;
  height: 72px;
  margin: 12px;
`;

const OperatorPage = () => {
  const paymentContext = useContext(PaymentContext);
  const handleClickButton = (operator: IOperator) => {
    paymentContext?.setOperator(operator);
    paymentContext?.nextStep();
  };
  return (
    <>
      <Title>Выберите оператора связи</Title>
      <Cards>
        {OPERATORS.map((item) => (
          <Card key={item.id} onClick={() => handleClickButton(item)}>
            <Logo>
              <Image
                src={item.logoPath}
                alt={item.operator}
                width={100}
                height={100}
              />
            </Logo>
            {item.operator}
          </Card>
        ))}
      </Cards>
    </>
  );
};

export default OperatorPage;
