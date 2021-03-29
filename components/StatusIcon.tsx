import { TStatus } from "../context/paymentContext";
import s from "../styles/StatusIcon.module.css";
const StatusIcon = ({status}:{status:TStatus|null}) => {
  return (
    <>{(status==='Process')&&
      <svg className={s.circle} viewBox="25 25 50 50">
        <circle className={s.sector} cx="50" cy="50" r="20"></circle>
      </svg>}
      {(status==='OK')&&
      <svg className={s.success} x="0px" y="0px" viewBox="0 0 50 50">
        <circle className={s.successCircle} cx="25" cy="25" r="25" />
        <polyline className={s.successPolyline} points="38,15 22,33 12,25 " />
      </svg>}
      {(status==='Error')&&
      <svg className={s.error} x="0px" y="0px" viewBox="0 0 50 50">
        <circle className={s.errorCircle} cx="25" cy="25" r="25" />
        <polyline className={s.errorPolyline} points="16,34 25,25 34,16   " />
        <polyline className={s.errorPolyline} points="16,16 25,25 34,34   " />
      </svg>}
    </>
  );
};
export default StatusIcon;
