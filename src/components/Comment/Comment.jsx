import { BsThreeDots } from "react-icons/bs";
import useToggle from "../../hooks/useToggle";
import { useRef, useEffect } from "react";

const Comment = (comments) => {
  const [commentMenu, toggleCommentMenu] = useToggle(false);
  const commentMenuRef = useRef(null);

  useEffect(() => {
    const closeCommentMenu = (e) => {
      if (commentMenuRef.current?.contains(e.target)) return;
      toggleCommentMenu(false);
    };
    document.addEventListener("mousedown", closeCommentMenu);
    return () => document.removeEventListener("mousedown", closeCommentMenu);
  }, []);

  return (
    <div className="flex space-x-4">
      <aside>
        <a href="#">
          <img
            className="rounded-full"
            src="https://res.cloudinary.com/practicaldev/image/fetch/s--4aGWmndK--/c_fill,f_auto,fl_progressive,h_50,q_auto,w_50/https://dev-to-uploads.s3.amazonaws.com/uploads/user/profile_image/523496/8dd7a765-04cd-4a91-bb6b-c93c2dc37f63.jpg"
            alt="ava"
          />
        </a>
      </aside>
      <div className="w-full">
        <div className="border p-2 rounded-md space-y-2 relative">
          <header className="flex justify-between space-x-2">
            <div className="flex space-x-2">
              <h3>fReeman</h3>
              <span>|</span>
              <h3>Feb 2</h3>
            </div>
            <div
              onClick={toggleCommentMenu}
              className="hover:bg-indigo-100 text-center p-2 hover:rounded-md"
            >
              <BsThreeDots size={20} />
            </div>
            {commentMenu && (
              <ul
                className="absolute right-2 top-12 bg-white border py-2 px-2 rounded-md w-1/3"
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
            <h3>Just a comment</h3>
          </main>
        </div>
        <footer className="text-base flex items-center gap-4 mt-2">
          <div className="flex justify-between items-center gap-2 text-black-200 rounded-md px-2 py-1 hover:bg-gray-200 cursor-pointer">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
              />
            </svg>
            <span className="text-base lg:text-sm"> Likes</span>
          </div>
          <div className="flex justify-between items-center gap-2 text-black-200 rounded-md px-2 py-1 hover:bg-gray-200 cursor-pointer">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M2.25 12.76c0 1.6 1.123 2.994 2.707 3.227 1.068.157 2.148.279 3.238.364.466.037.893.281 1.153.671L12 21l2.652-3.978c.26-.39.687-.634 1.153-.67 1.09-.086 2.17-.208 3.238-.365 1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z"
              />
            </svg>
            <span className="text-base lg:text-sm">Reply</span>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Comment;
