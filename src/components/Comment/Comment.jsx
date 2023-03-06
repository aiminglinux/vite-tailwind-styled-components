import { useContext, useEffect, useRef, useState } from 'react';
import { BsHeart, BsHeartFill, BsThreeDots, BsReply } from 'react-icons/bs';

import { selectCurrentUser } from '../../core/features/auth/authSlice';
import useToggle from '../../hooks/useToggle';

import { MdOutlineModeComment } from 'react-icons/md';

import { formatDate, isCommentLikedByUser } from '../../utils/string';

import { useSelector } from 'react-redux';
import { PostContext } from '../../pages/SinglePostView/PostContainer';
import CommentList from './CommentList';
import ContentMarkdown from '../ContentMarkdown/ContentMarkdown';
import CommentForm from './CommentForm';

const Comment = ({ comment, depth }) => {
  const {
    handleCommentReaction,
    commentReactLoading,
    likedCommentId,
    handleCommentData,
    showReplyForm,
  } = useContext(PostContext);
  const { id } = useSelector(selectCurrentUser);
  const [commentMenu, toggleCommentMenu] = useToggle(false);
  const [showReplies, setShowReplies] = useState(false);
  const [replyForm, setReplyForm] = useState(false);

  const commentMenuRef = useRef(null);

  const isLiked = isCommentLikedByUser(comment, id);
  const isOwner = id === comment.author.id;

  const isAnimated = commentReactLoading && comment.id === likedCommentId;

  const handleToggleReplies = () => {
    setShowReplies(!showReplies);
  };

  const handleLikeClick = () => {
    handleCommentReaction(comment.id, isLiked);
  };

  function handleReply(commentId) {
    setReplyForm(!replyForm);
    handleCommentData({ commentId: commentId });
  }

  useEffect(() => setReplyForm(false), [showReplyForm]);

  useEffect(() => {
    const closeCommentMenu = (e) => {
      if (commentMenuRef.current?.contains(e.target)) return;
      toggleCommentMenu(false);
    };
    document.addEventListener('mousedown', closeCommentMenu);
    return () => document.removeEventListener('mousedown', closeCommentMenu);
  }, [commentMenu]);

  return (
    <>
      <div
        className={`flex space-x-2 border rounded-md p-2 bg-gray-200 ${
          depth > 0 ? 'pr-0' : ''
        }`}
      >
        <a href='#' id={`${comment.id}`}>
          <img
            className='rounded-full w-12'
            src={comment.author.picture.url}
            alt='avatar'
          />
        </a>

        <div className='w-full space-y-2'>
          <div className='bg-white border rounded-md space-y-2 relative'>
            <header className='flex justify-between space-x-2 p-2'>
              <div className='flex space-x-2'>
                <h3>{comment.author.name}</h3>
                <span>|</span>
                <h3>{formatDate(comment.createdAt)}</h3>
              </div>
              <div
                onClick={toggleCommentMenu}
                className='hover:bg-indigo-100 text-center p-2 hover:rounded-md'
                ref={commentMenuRef}
              >
                <BsThreeDots size={20} />
              </div>
              {commentMenu && (
                <ul
                  className='absolute right-2 top-12 bg-white border py-2 px-2 rounded-md w-1/3 z-20'
                  onClick={toggleCommentMenu}
                >
                  <li className='hover:bg-indigo-100 hover:text-indigo-500 p-2 rounded-md'>
                    Copy Link
                  </li>
                  {isOwner && (
                    <li className='hover:bg-indigo-100 hover:text-indigo-500 p-2 rounded-md'>
                      Settings
                    </li>
                  )}
                  {isOwner && (
                    <li className='hover:bg-indigo-100 hover:text-indigo-500 p-2 rounded-md'>
                      Edit
                    </li>
                  )}
                  {isOwner && (
                    <li className='hover:bg-indigo-100 hover:text-indigo-500 p-2 rounded-md'>
                      Delete
                    </li>
                  )}
                </ul>
              )}
            </header>
            <main className='p-2'>
              <ContentMarkdown children={comment.body} />
            </main>
          </div>
          <footer className='text-base flex items-center space-x-2'>
            {!replyForm && (
              <button
                onClick={handleLikeClick}
                className={`${isLiked ? 'bg-pink-50' : ''} ${
                  isAnimated ? 'opacity-10' : ''
                } flex justify-between items-center gap-2 text-black-200 rounded-md px-2 py-1 hover:bg-white cursor-pointer`}
              >
                {isLiked ? (
                  <BsHeartFill size={20} className='text-pink-500' />
                ) : (
                  <BsHeart size={20} />
                )}
                <span className='text-base lg:text-sm'>
                  {comment.likes.length} Likes
                </span>
              </button>
            )}
            {comment.replies.length > 0 && !replyForm && (
              <button
                className='flex justify-between items-center gap-2 text-black-200 rounded-md px-2 py-1 hover:bg-white cursor-pointer'
                onClick={handleToggleReplies}
              >
                <MdOutlineModeComment size={24} />
                <span className='text-base lg:text-sm'>
                  {showReplies ? 'Hide' : 'Show'} {comment.replies.length}{' '}
                  Replies
                </span>
              </button>
            )}
            {!replyForm && (
              <button
                onClick={() => handleReply(comment.id)}
                className='flex justify-between items-center gap-2 text-black-200 rounded-md px-2 py-1 hover:bg-white cursor-pointer'
              >
                <BsReply size={24} />
                <span className='text-base lg:text-sm'>Reply</span>
              </button>
            )}
            {replyForm && (
              <CommentForm
                replyMode
                handleReply={handleReply}
                placeholder={'Reply...'}
              />
            )}
          </footer>
          {showReplies && (
            <CommentList comments={comment.replies} depth={depth + 1} id={id} />
          )}
        </div>
      </div>
    </>
  );
};

export default Comment;
