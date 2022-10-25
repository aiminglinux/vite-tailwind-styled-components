import React, { Fragment } from "react";
import tw from "twin.macro";

import RouteWrapper from "../../components/RouteWrapper/RouteWrapper";
import PostList from "../../components/PostList/PostList";
import LeftSideBar from "../LeftSideBar/LeftSideBar";
import RightSideBar from "../RightSideBar/RightSideBar";

function Home() {
  return (
    <Wrapper>
      <LeftSideBar />

      <PostList />

      <RightSideBar />
    </Wrapper>
  );
}

const Wrapper = tw.div`grid gap-4 grid-cols-1 md:grid-cols-[0.5fr 2fr] lg:grid-cols-[0.75fr 2fr 1fr] w-full max-w-screen-xl mx-auto`;
export default Home;
