import { RiHeart2Line, RiHeart2Fill, RiBookmarkLine } from "react-icons/ri";
import { MdOutlineModeComment } from "react-icons/md";
import { Fragment } from "react";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";

import { isLikedByMe } from "../../../utils/string";

const Reactions = ({ commentRef, post, id, onPostActions, postLoading }) => {
  const scrollToComment = () => {
    if (commentRef.current) {
      commentRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const isLike = isLikedByMe(post.likes, id);
  console.log(post.likes);

  const handlePostActions = (type) => {
    onPostActions(post.id, type, id, isLike);
  };

  return (
    <Fragment>
      <div className="grid fixed top-40 w-16">
        <div className="grid grid-flow-raw gap-4 justify-stretch top-10">
          <Tippy
            placement="bottom"
            content={`${isLike ? "Unlike this post" : "Like this post"}`}
          >
            <button
              className="inline-flex flex-col flex-1 items-center"
              onClick={() => handlePostActions("like")}
              disabled={postLoading}
            >
              <span
                className={`${
                  postLoading ? "animate-spin" : ""
                } p-2 rounded-full hover:bg-pink-100 hover:text-pink-500 transition-none border-2 border-transparent ${
                  isLike ? `border-2 border-pink-500` : ""
                }`}
              >
                {isLike ? (
                  <RiHeart2Fill
                    size={28}
                    className="text-pink-500 rounded-full"
                  />
                ) : (
                  <RiHeart2Line size={28} />
                )}
              </span>
              <span>{post.likes.length}</span>
            </button>
          </Tippy>
          <Tippy placement="bottom" content="&#128172; Jump to comment section">
            <button
              className="inline-flex flex-col flex-1 items-center"
              onClick={scrollToComment}
            >
              <span className="p-2 rounded-full hover:bg-orange-100 hover:text-orange-500 transition-none">
                <MdOutlineModeComment size={28} />
              </span>
              <span>{post.comments.length}</span>
            </button>
          </Tippy>
          <Tippy placement="bottom" content="&#128278; Bookmark this post">
            <button
              className="inline-flex flex-col flex-1 items-center"
              onClick={() => handlePostActions("bookmark")}
            >
              <span className="p-2 rounded-full hover:bg-blue-100 hover:text-blue-500 transition-none">
                <RiBookmarkLine size={28} />
              </span>
              <span>{post.bookmarks.length}</span>
            </button>
          </Tippy>
        </div>
      </div>
    </Fragment>
  );
};

export default Reactions;
