import { useParams } from "react-router-dom";

import { useGetPostQuery } from "../../core/features/posts/postsApiSlice";
import { createPostUrl, getPostParams } from "../../utils/string";

import AuthorDetail from "./components/AuthorDetail";
import PostContent from "./components/PostContain";
import Reactions from "./components/Reactions";
import NotFound from "../../components/NotFound/NotFound";
import { Fragment } from "react";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";

const PostDetail = () => {
  const { username, postUrl } = useParams();
  const { postTitle, postId } = getPostParams(postUrl);
  const { data: post, isLoading } = useGetPostQuery(
    { url: `${username}/${createPostUrl(postTitle, postId)}` },
    { refetchOnMountOrArgChange: true }
  );
  //   console.log(post);
  return (
    <Fragment>
      {isLoading ? (
        <LoadingSpinner />
      ) : post ? (
        <>
          <div className="grid gap-4 grid-cols-1 md:grid-cols-[50px_1fr] lg:grid-cols-[64px_1fr_350px] mx-auto">
            <aside className="hidden md:block">
              <Reactions />
            </aside>
            <main>
              <PostContent post={post} />
            </main>
            <aside className="hidden lg:block">
              <AuthorDetail author={post.author} />
            </aside>
          </div>
        </>
      ) : (
        "not found"
      )}
    </Fragment>
  );
};

export default PostDetail;
