import tw from "twin.macro";
import Backdrop from "../../../components/Backdrop/Backdrop";

import React, { Fragment } from "react";
import NavMenu from "../../../components/NavMenu/NavMenu";

const MobileMenu = ({ toggleMobileMenu }) => {
  return (
    <Fragment>
      <Backdrop onClick={toggleMobileMenu} />
      <Wrapper onClick={toggleMobileMenu}>
        <Menu>
          <NavMenu />
        </Menu>
      </Wrapper>
    </Fragment>
  );
};

const Wrapper = tw.aside`w-60 bg-white z-50 absolute h-screen inset-0`;
const Menu = tw.div`flex justify-between items-center`;

export default MobileMenu;
