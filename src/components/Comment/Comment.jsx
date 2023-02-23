import { useContext, useEffect, useRef, useState } from "react";
import { BsHeart, BsHeartFill, BsThreeDots, BsReply } from "react-icons/bs";
import Xarrow, { useXarrow, Xwrapper } from "react-xarrows";

import { selectCurrentUser } from "../../core/features/auth/authSlice";
import useToggle from "../../hooks/useToggle";

import { MdOutlineModeComment } from "react-icons/md";

import { formatDate, isCommentLikedByUser } from "../../utils/string";

import { useSelector } from "react-redux";
import { PostContext } from "../../pages/SinglePostView/PostContainer";
import CommentList from "./CommentList";

const Comment = ({ comment, depth }) => {
  const { id } = useSelector(selectCurrentUser);
  const [commentMenu, toggleCommentMenu] = useToggle(false);
  const [showReplies, setShowReplies] = useState(false);

  const commentMenuRef = useRef(null);
  const updateXarrow = useXarrow();
  const { handleCommentReaction, commentReactLoading, likedCommentId } =
    useContext(PostContext);
  const isLiked = isCommentLikedByUser(comment, id);

  const isAnimated = commentReactLoading && comment.id === likedCommentId;

  const handleToggleReplies = () => {
    setShowReplies(!showReplies);
  };

  const handleLikeClick = () => {
    handleCommentReaction(comment.id, isLiked);
  };

  useEffect(() => {
    const closeCommentMenu = (e) => {
      e.preventDefault();
      if (commentMenuRef.current?.contains(e.target)) return;
      toggleCommentMenu(false);
    };
    document.addEventListener("mousedown", closeCommentMenu);
    return () => document.removeEventListener("mousedown", closeCommentMenu);
  }, []);

  return (
    <Xwrapper>
      <div
        className={`flex space-x-2 border rounded-md p-2 bg-gray-200 ${
          depth > 0 ? "pr-0" : ""
        }`}
        onLoad={() => updateXarrow()}
      >
        <aside>
          <a href="#" id={`${comment.id}`}>
            <img
              className="rounded-full w-12"
              src={comment.author.picture.url}
              alt="avatar"
            />
          </a>
        </aside>

        <div className="w-full ">
          <div className="bg-white border p-2 rounded-md space-y-2 relative">
            <header className="flex justify-between space-x-2">
              <div className="flex space-x-2">
                <h3>{comment.author.name}</h3>
                <span>|</span>
                <h3>{formatDate(comment.createdAt)}</h3>
              </div>
              <div
                onClick={toggleCommentMenu}
                className="hover:bg-indigo-100 text-center p-2 hover:rounded-md"
                ref={commentMenuRef}
              >
                <BsThreeDots size={20} />
              </div>
              {commentMenu && (
                <ul
                  className="absolute right-2 top-12 bg-white border py-2 px-2 rounded-md w-1/3 z-20"
                  // ref={commentMenuRef}
                  onClick={toggleCommentMenu}
                >
                  <li className="hover:bg-indigo-100 hover:text-indigo-500 p-2 rounded-md">
                    Copy Link
                  </li>
                  <li className="hover:bg-indigo-100 hover:text-indigo-500 p-2 rounded-md">
                    Settings
                  </li>
                  <li className="hover:bg-indigo-100 hover:text-indigo-500 p-2 rounded-md">
                    Edit
                  </li>
                  <li className="hover:bg-indigo-100 hover:text-indigo-500 p-2 rounded-md">
                    Delete
                  </li>
                </ul>
              )}
            </header>
            <main>
              <h3>{comment.body}</h3>
            </main>
          </div>
          <footer className="text-base flex items-center gap-4 mt-2">
            <button
              onClick={handleLikeClick}
              disabled={isAnimated}
              className={`${isLiked ? "bg-pink-50" : ""} ${
                isAnimated ? "opacity-10" : ""
              } flex justify-between items-center gap-2 text-black-200 rounded-md px-2 py-1 hover:bg-white cursor-pointer`}
            >
              {isLiked ? (
                <BsHeartFill size={20} className="text-pink-500" />
              ) : (
                <BsHeart size={20} />
              )}
              <span className="text-base lg:text-sm">
                {comment.likes.length} Likes
              </span>
            </button>
            {comment.replies.length > 0 && (
              <button
                className="flex justify-between items-center gap-2 text-black-200 rounded-md px-2 py-1 hover:bg-white cursor-pointer"
                onClick={handleToggleReplies}
              >
                <MdOutlineModeComment size={24} />
                <span className="text-base lg:text-sm">
                  {showReplies ? "Hide" : "Show"} {comment.replies.length}{" "}
                  Replies
                </span>
              </button>
            )}
            <div className="flex justify-between items-center gap-2 text-black-200 rounded-md px-2 py-1 hover:bg-white cursor-pointer">
              <BsReply size={24} />
              <span className="text-base lg:text-sm">Reply</span>
            </div>
          </footer>
          {showReplies && (
            <CommentList comments={comment.replies} depth={depth + 1} id={id} />
          )}
          {showReplies &&
            comment.replies.map((reply) => (
              <Xarrow
                key={reply.id}
                start={`${comment.id}`}
                end={`${reply.id}`}
                endAnchor="left"
                color="rgba(59,130,246, 1)"
                strokeWidth={0.5}
                headSize={8}
                showHead={true}
                showTail={true}
                headShape={"circle"}
                tailSize={8}
                path={"grid"}
                gridBreak="70%"
                tailShape={"circle"}
              />
            ))}
        </div>
      </div>
    </Xwrapper>
  );
};

export default Comment;
