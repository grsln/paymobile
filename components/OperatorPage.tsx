import { useContext } from "react";
import { IOperator, PaymentContext } from "../context/paymentContext";
import Image from "next/image";
import s from "../styles/OperatorPage.module.css";

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

const OperatorPage = () => {
  const paymentContext = useContext(PaymentContext);
  const handleClickButton = (operator: IOperator) => {
    paymentContext?.setOperator(operator);
    paymentContext?.nextStep();
  };
  return (
    <div className={s.main}>
      <div className={s.title}>Выберите оператора связи</div>
      <div className={s.cards}>
        {OPERATORS.map((item) => (
          <div
            className={s.card}
            key={item.id}
            onClick={() => handleClickButton(item)}
          >
            <div className={s.logo}>
              <Image
                className={s.logo}
                src={item.logoPath}
                alt={item.operator}
                width={100}
                height={100}
              />
            </div>
            {item.operator}
          </div>
        ))}
      </div>
    </div>
  );
};

export default OperatorPage;
