import { nanoid } from "@reduxjs/toolkit";

import Skeleton from "../Skeleton/Skeleton";
import Post from "./components/Post";

const PostList = ({ isLoading, posts }) => {
  // console.log(posts);
  return (
    <div className="flex flex-col space-y-4">
      {posts?.length > 0
        ? posts.map((post) => <Post key={nanoid()} post={post} />)
        : "no content"}
    </div>
  );
};

export default PostList;
