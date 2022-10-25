import { Fragment } from "react";
import { Outlet } from "react-router-dom";
import tw from "twin.macro";
import Navbar from "../Navbar/Navbar";

function DefaultLayout() {
  return (
    <Fragment>
      <Wrapper>
        <Navbar />
        <Outlet />
      </Wrapper>
    </Fragment>
  );
}
const Wrapper = tw.div`w-full max-w-screen-xl mx-auto mt-14 md:p-4`;

export default DefaultLayout;
