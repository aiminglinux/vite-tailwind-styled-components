import Toast from "../Toast/Toast";
import { useSelector } from "react-redux";

const Notification = () => {
  const notiList = useSelector((state) => state.notification);
  //   console.log(notiList);
  return (
    notiList !== null &&
    notiList.length > 0 &&
    notiList.map((noti) => (
      <Toast key={noti.id} type={noti.notiType} msg={noti.message} />
    ))
  );
};

export default Notification;
