import React, { useEffect } from "react";
import tw from "twin.macro";

import { useSelector } from "react-redux";
import { useGetPostsQuery } from "../../core/features/posts/postsApiSlice";
import { selectCurrentUser } from "../../core/features/auth/authSlice";
import useRequireAuthen from "../../hooks/useRequireAuthen";

import PostList from "../../components/PostList/PostList";
import LeftSideBar from "../LeftSideBar/LeftSideBar";
import RightSideBar from "../RightSideBar/RightSideBar";

function Home() {
  const { id } = useSelector(selectCurrentUser);
  const { isAuthen, handleAuth } = useRequireAuthen();
  const { data: posts, isFetching } = useGetPostsQuery(null, {
    refetchOnMountOrArgChange: true,
  });

  // useEffect(() => {
  //   if (!isAuthen) {
  //     handleAuth();
  //   }
  // });

  return (
    <Wrapper>
      <LeftSideBar />

      <PostList isFetching={isFetching} posts={posts} />

      <RightSideBar />
    </Wrapper>
  );
}

const Wrapper = tw.div`grid gap-4 grid-cols-1 md:grid-cols-[0.5fr 2fr] lg:grid-cols-[0.75fr 2fr 1fr] w-full max-w-screen-xl mx-auto`;
export default Home;
