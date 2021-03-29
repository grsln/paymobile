import React from "react";
export interface IOperator {
  id: number;
  operator: string;
  logo: string;
  logoPath:string;
}
export type TStatus = "OK" | "Error" | "Process";
export enum Steps {
  "operator",
  "phone",
  "confirm",
}
export interface IPayment {
  step: Steps;
  operator: IOperator | null;
  phoneNumber: number | null;
  amount: number | null;
  status: TStatus | null;
  nextStep: () => void;
  prevStep: () => void;
  setOperator: (operator: IOperator) => void;
  setPhone: (phoneNumber: number) => void;
  setAmount: (amount: number | null) => void;
  setStatus: (status: TStatus) => void;
  clearContext: () => void;
  getFormattedPhone: () => string;
  getAmount: () => string;
}
export const PaymentContext = React.createContext<IPayment | null>(null);
