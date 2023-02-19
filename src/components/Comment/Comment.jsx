import { BsThreeDots } from "react-icons/bs";
import { useRef, useEffect, useState, useLayoutEffect } from "react";
import Xarrow, { useXarrow, Xwrapper } from "react-xarrows";

import useToggle from "../../hooks/useToggle";

import { AiOutlineHeart } from "react-icons/ai";
import { MdOutlineModeComment } from "react-icons/md";
import { BsReply } from "react-icons/bs";

import { formatDate } from "../../utils/string";
import CommentList from "./CommentList";
import { getReplies } from "../../utils/string";

const Comment = ({ comment, onToggleReplies }) => {
  const [commentMenu, toggleCommentMenu] = useToggle(false);
  const [showReplies, setShowReplies] = useState(true);

  const commentMenuRef = useRef(null);
  const updateXarrow = useXarrow();

  const handleToggleReplies = () => {
    setShowReplies(!showReplies);
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
      <div className="flex space-x-2 border rounded-md p-2 bg-gray-200">
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
              >
                <BsThreeDots size={20} />
              </div>
              {commentMenu && (
                <ul
                  className="absolute right-2 top-12 bg-white border py-2 px-2 rounded-md w-1/3 z-20"
                  ref={commentMenuRef}
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
            <div className="flex justify-between items-center gap-2 text-black-200 rounded-md px-2 py-1 hover:bg-white cursor-pointer">
              <AiOutlineHeart size={24} />
              <span className="text-base lg:text-sm"> Likes</span>
            </div>
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
          {/* {showReplies && <CommentList comments={replies} />} */}
          {showReplies && <CommentList comments={comment.replies} />}

          {showReplies &&
            comment.replies.map((reply) => (
              <Xarrow
                key={reply.id}
                start={`${comment.id}`}
                end={`${reply.id}`}
                endAnchor="left"
                color="white"
                strokeWidth={1}
                headSize={0}
                path={"grid"}
                gridBreak="90%"
              />
            ))}
        </div>
      </div>
    </Xwrapper>
  );
};

export default Comment;
