import { Fragment } from "react";
import { Outlet } from "react-router-dom";
import tw from "twin.macro";
import Navbar from "../Navbar/Navbar";

function GlobalLayout() {
  return (
    <Fragment>
      <Wrapper>
        <Navbar />
        <Outlet />
      </Wrapper>
    </Fragment>
  );
}
const Wrapper = tw.div`max-w-[1280px] w-full flex justify-between mx-auto items-center mt-20 md:px-4`;

export default GlobalLayout;
