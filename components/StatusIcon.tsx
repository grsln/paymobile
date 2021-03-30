import styled from "styled-components";
import { TStatus } from "../context/paymentContext";

const Spinner = styled.svg`
  display: inline-block;
  vertical-align: top;
  width: 50px;
  height: 50px;
  animation: spinner-circle 2s linear infinite;
  transform-origin: center center;
  @keyframes spinner-circle {
  100% {
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg);
  }}
`;
const Circle = styled.circle`
  fill: none;
  stroke: #d8d8d8;
  animation: spinner-sector 1.5s ease-in-out infinite;
  stroke-width: 4;
  stroke-linecap: round;
  stroke-dasharray: 50, 200;
  stroke-dashoffset: 0;
  @keyframes spinner-sector {
  0% {
    stroke-dasharray: 1, 200;
    stroke-dashoffset: 0;
  }
  50% {
    stroke-dasharray: 50, 200;
    stroke-dashoffset: -25;
  }
  100% {
    stroke-dasharray: 50, 200;
    stroke-dashoffset: -125;
  }
}
`;
const Success = styled.svg`
  width: 50px;
  height: 50px;
`;
const SuccessCircle = styled.circle`
  fill: #25ae88;
`;
const SuccessPolyline = styled.polyline`
  fill: none;
  stroke: #ffffff;
  stroke-width: 2;
  stroke-linecap: round;
  stroke-linejoin: round;
  stroke-miterlimit: 10;
`;

const Error = styled.svg`
  width: 50px;
  height: 50px;
`;
const ErrorCircle = styled.circle`
  fill: #d75a4a;
`;
const ErrorPolyline = styled.polyline`
  fill: none;
  stroke: #ffffff;
  stroke-width: 2;
  stroke-linecap: round;
  stroke-miterlimit: 10;
`;
const StatusIcon = ({status}:{status:TStatus|null}) => {
  return (
    <>{(status==='Process')&&
      <Spinner viewBox="25 25 50 50">
        <Circle cx="50" cy="50" r="20"></Circle>
      </Spinner>}
      {(status==='OK')&&
      <Success x="0px" y="0px" viewBox="0 0 50 50">
        <SuccessCircle cx="25" cy="25" r="25" />
        <SuccessPolyline points="38,15 22,33 12,25 " />
      </Success>}
      {(status==='Error')&&
      <Error x="0px" y="0px" viewBox="0 0 50 50">
        <ErrorCircle cx="25" cy="25" r="25" />
        <ErrorPolyline points="16,34 25,25 34,16   " />
        <ErrorPolyline points="16,16 25,25 34,34   " />
      </Error>}
    </>
  );
};
export default StatusIcon;
