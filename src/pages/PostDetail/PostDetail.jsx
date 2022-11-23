import { useParams } from "react-router-dom";
import { useRef, forwardRef } from "react";

import { useGetPostQuery } from "../../core/features/posts/postsApiSlice";
import { createPostUrl, getPostParams } from "../../utils/string";

import AuthorDetail from "./components/AuthorDetail";
import PostContent from "./components/PostContain";
import Reactions from "./components/Reactions";
import NotFound from "../../components/NotFound/NotFound";
import { Fragment } from "react";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";

const PostDetail = () => {
  const commentRef = useRef(null);
  const { username, postSlug } = useParams();

  const {
    data: post,
    isLoading,
    isError,
  } = useGetPostQuery(
    { url: `${username}/${postSlug}` },
    { refetchOnMountOrArgChange: true }
  );
  // console.log(post);
  return (
    <Fragment>
      {isLoading ? (
        <LoadingSpinner />
      ) : post ? (
        <>
          <div className="grid gap-4 grid-cols-1 md:grid-cols-[50px_1fr] lg:grid-cols-[64px_1fr_350px] mx-auto">
            <aside className="hidden md:block">
              <Reactions commentRef={commentRef} />
            </aside>
            <main>
              <PostContent post={post} ref={commentRef} />
            </main>
            <aside className="hidden lg:block">
              <AuthorDetail author={post.author} />
            </aside>
          </div>
        </>
      ) : (
        <NotFound />
      )}
    </Fragment>
  );
};

export default PostDetail;
