import { createContext, useRef, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { useGetPostQuery } from '../../core/features/posts/postsApiSlice';

import {
  useDeletePostMutation,
  usePostActionsMutation,
} from '../../core/features/posts/postsApiSlice';

import {
  selectCurrentUser,
  selectAuthModal,
} from '../../core/features/auth/authSlice';

import {
  useCommmentActionMutation,
  useAddCommentMutation,
} from '../../core/features/comment/commentsApiSlice';

import postsApiSlice from '../../core/features/posts/postsApiSlice';

import useRequireAuthen from '../../hooks/useRequireAuthen';

import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner';
import NotFound from '../../components/NotFound/NotFound';
import AuthorDetail from './components/AuthorDetail';
import PostDetail from './components/PostDetail';
import Reactions from './components/Reactions';
import More from './components/More';
import Modal from '../../components/Portal/Component/Modal';
import LoginForm from '../Login/components/LoginForm';

export const PostContext = createContext();

const PostContainer = () => {
  const commentRef = useRef(null);
  const [likedCommentId, setLikedCommentId] = useState(null);
  const [showReplyForm, setShowReplyForm] = useState(false);
  const { id } = useSelector(selectCurrentUser);
  const authModal = useSelector(selectAuthModal);
  const navigate = useNavigate();
  const { postId } = useParams();
  const { isAuthed, handleAuth } = useRequireAuthen();

  const [postReactions, { isLoading: postReactLoading, error }] =
    usePostActionsMutation();

  const [commentReactions, { isLoading: commentReactLoading }] =
    useCommmentActionMutation();

  const [addComment, { isLoading: addCommentLoading }] =
    useAddCommentMutation();

  // const [updateComment] = useUpdateCommentMutation();

  const [deletePost, { isLoading: deletePostLoading }] =
    useDeletePostMutation();

  const {
    data: post,
    isLoading: singlePostLoading,
    refetch,
  } = useGetPostQuery(postId, {
    refetchOnMountOrArgChange: true,
  });

  // const { data: postsByUser, isLoading: postsByUserLoading } = useGetUserQuery(
  //   username,
  //   { refetchOnMountOrArgChange: true }
  // );

  const [commentData, setCommentData] = useState({
    commentText: '',
    commentId: undefined,
  });

  const handleCommentData = ({ text, commentId }) => {
    setCommentData({ ...commentData, commentText: text });
    if (commentId) {
      setCommentData({
        ...commentData,
        commentId: commentId,
      });
    }
  };

  const handleSubmitComment = async () => {
    console.log('Submit data: ', commentData);
    // setShowReplyForm(!showReplyForm);

    try {
      await addComment({
        postId,
        commentData,
      });
      setShowReplyForm(!showReplyForm);

      refetch();
    } catch (err) {
      console.error(err);
    }
  };

  const handlePostActions = async (
    postId,
    type,
    userId,
    isLikedOrBookmarked
  ) => {
    const actionKey = type + 's';
    if (isAuthed) {
      try {
        postReactions({
          postId,
          userId,
          isLikedOrBookmarked,
          type: `${type}`,
          actionKey,
        });
      } catch (err) {
        console.error(err);
      }
    }
  };

  const handleCommentReaction = async (id, isLiked) => {
    setLikedCommentId(id);
    await commentReactions({ id });
    refetch();
  };

  const onDelete = async (slug) => {
    // if (isAuthed) {
    //   try {
    //     await deletePost({ url: `${username}/${slug}` });
    //     navigate("/");
    //   } catch (error) {
    //     console.log(error);
    //   }
    // } else handleAuth();
  };

  // const isLoading =
  //   singlePostLoading || deletePostLoading || postsByUserLoading;
  const isLoading = singlePostLoading;

  // !isLoading && console.log(postsByUser);

  return (
    <PostContext.Provider
      value={{
        handleCommentReaction,
        commentReactLoading,
        handleSubmitComment,
        handleCommentData,
        showReplyForm,
      }}
    >
      {/* <Modal
        title={`You need to login first to perform actions`}
        // promptText={`We are waiting for your next awesome post!`}
        isOpen={authModal}
        children={<LoginForm />}
      /> */}
      {isLoading && <LoadingSpinner />}
      {!isLoading && !post && <NotFound />}
      {!isLoading && post && (
        <div className='grid gap-4 grid-cols-1 md:grid-cols-[50px_1fr] lg:grid-cols-[64px_1fr_350px] mx-auto relative'>
          <aside className='hidden md:block'>
            <Reactions
              commentRef={commentRef}
              post={post}
              id={id}
              onPostActions={handlePostActions}
              isLoading={postReactLoading}
            />
          </aside>
          <main>
            <PostDetail
              post={post}
              ref={commentRef}
              onDelete={onDelete}
              id={id}
              isAuthed={isAuthed}
            />
          </main>
          <aside className='hidden lg:block space-y-4'>
            <AuthorDetail author={post.author} />
            {/* <More author={postsByUser} /> */}
          </aside>
        </div>
      )}
    </PostContext.Provider>
  );
};

export default PostContainer;
