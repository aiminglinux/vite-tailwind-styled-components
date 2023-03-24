import { Fragment } from 'react';
import { Outlet } from 'react-router-dom';
import tw from 'twin.macro';
import ScrollButton from '../../components/ScrollToTop/ScrollToTop';
import Navbar from '../Navbar/Navbar';

function DefaultLayout() {
  return (
    <Fragment>
      <Wrapper>
        {/* <Navbar /> */}
        <Outlet />
        <ScrollButton />
      </Wrapper>
    </Fragment>
  );
}
const Wrapper = tw.div`w-full max-w-screen-xl mx-auto mt-14 md:p-4 overflow-visible`;

export default DefaultLayout;
