import { useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";

import { useGetPostQuery } from "../../core/features/posts/postsApiSlice";
import { useGetUserQuery } from "../../core/features/users/usersApiSlice";
import { useDeletePostMutation } from "../../core/features/posts/postsApiSlice";

import useRequireAuthen from "../../hooks/useRequireAuthen";

import { Fragment } from "react";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";
import NotFound from "../../components/NotFound/NotFound";
import AuthorDetail from "./components/AuthorDetail";
import PostDetail from "./components/PostDetail";
import Reactions from "./components/Reactions";
import More from "./components/More";

const PostContainer = () => {
  const commentRef = useRef(null);
  const navigate = useNavigate();
  const { username, postSlug } = useParams();
  const { isAuthed, handleAuth } = useRequireAuthen();

  const [deletePost, { isLoading: deletePostLoading }] =
    useDeletePostMutation();

  const { data: post, isLoading: singlePostLoading } = useGetPostQuery(
    { url: `${username}/${postSlug}` },
    { refetchOnMountOrArgChange: true }
  );

  const { data: postsByUser, isLoading: postsByUserLoading } = useGetUserQuery(
    username,
    { refetchOnMountOrArgChange: true }
  );

  const onDelete = async (slug) => {
    if (isAuthed) {
      try {
        await deletePost({ url: `${username}/${slug}` });
        navigate("/");
      } catch (error) {
        console.log(error);
      }
    } else handleAuth();
  };

  const isLoading =
    singlePostLoading || deletePostLoading || postsByUserLoading;

  // !isLoading && console.log(postsByUser);

  return (
    <Fragment>
      {isLoading && <LoadingSpinner />}
      {!isLoading && !post && <NotFound />}
      {!isLoading && post && (
        <div className="grid gap-4 grid-cols-1 md:grid-cols-[50px_1fr] lg:grid-cols-[64px_1fr_350px] mx-auto">
          <aside className="hidden md:block">
            <Reactions commentRef={commentRef} />
          </aside>
          <main>
            <PostDetail post={post} ref={commentRef} onDelete={onDelete} />
          </main>
          <aside className="hidden lg:block space-y-4">
            <AuthorDetail author={post.author} />
            <More author={postsByUser} />
          </aside>
        </div>
      )}
    </Fragment>
  );
};

export default PostContainer;
