import { Fragment } from "react";
import { Outlet } from "react-router-dom";
import tw from "twin.macro";
import Notification from "../../components/Notiffication/Notification";
import Toast from "../../components/Toast/Toast";
import Navbar from "../Navbar/Navbar";

function GlobalLayout() {
  return (
    <Fragment>
      <div className="right-6 top-20 fixed min-w-[25%] space-y-2">
        <Notification />
      </div>
      <Wrapper>
        <Navbar />
        <Outlet />
      </Wrapper>
    </Fragment>
  );
}
const Wrapper = tw.div`max-w-[1280px] w-full flex justify-between mx-auto items-center mt-20 md:px-4`;

export default GlobalLayout;
