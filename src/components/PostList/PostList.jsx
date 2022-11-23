import { nanoid } from "@reduxjs/toolkit";

import Skeleton from "../Skeleton/Skeleton";
import Post from "./components/Post";
import NoContent from "../NotFound/NoContent";

const PostList = ({ isFetching, posts, enableImage = true }) => {
  return (
    <>
      {isFetching ? (
        <div className="flex flex-col space-y-4">
          {[1, 2, 3, 4, 5].map((i) => (
            <Skeleton key={i} isFirstPost={enableImage && i === 1} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col space-y-4">
          {posts?.length > 0 ? (
            posts.map((post, idx) => (
              <Post
                key={nanoid()}
                post={post}
                isFirstPost={enableImage && idx === 0}
              />
            ))
          ) : (
            <NoContent />
          )}
        </div>
      )}
    </>
  );
};

export default PostList;
