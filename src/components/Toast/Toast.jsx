import tw, { styled } from "twin.macro";
import {
  VscBellDot,
  VscClose,
  VscInfo,
  VscWarning,
  VscError,
} from "react-icons/vsc";

import { BsCheckCircle } from "react-icons/bs";

// const Toast = ({ type, msg }) => {
//   console.log(type);
//   console.log(msg);
// };
const Toast = ({ isSuccess, isInfo, isWarning, isError, isNotify }) => {
  console.log("Toast-type: ", toastType);
  return (
    <Wrapper {...{ isSuccess, isInfo, isWarning, isError, isNotify }}>
      <div
        className={`px-4 ${isSuccess ? `text-green-400` : ""} ${
          isError ? "text-red-400" : ""
        } ${isInfo ? `text-blue-400` : ""} ${isWarning ? `text-yellow-400` : ""}
        ${isNotify ? `text-pink-400` : ""}
        `}
      >
        {isSuccess && <BsCheckCircle size={28} />}
        {isError && <VscError size={28} />}
        {isNotify && <VscBellDot size={28} />}
        {isInfo && <VscInfo size={28} />}
        {isWarning && <VscWarning size={28} />}
      </div>
      <div className="flex-1">
        <h3 className="font-bold">Information</h3>
        <p>Information details...</p>
      </div>
      <div className="px-4 hover:opacity-10">
        <VscClose size={28} />
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div(
  ({ isSuccess, isInfo, isWarning, isError, isNotify }) => [
    tw`flex items-center border  border-l-8 bg-gray-200  py-3 shadow-md rounded-md z-50`,
    isError && tw`border-l-red-400`,
    isSuccess && tw`border-l-green-400`,
    isInfo && tw`border-l-blue-400`,
    isWarning && tw`border-l-yellow-400`,
    isNotify && tw`border-l-pink-500`,
  ]
);
export default Toast;
