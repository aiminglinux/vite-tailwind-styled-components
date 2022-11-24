import { RiHeart2Line, RiHeart2Fill, RiBookmarkLine } from "react-icons/ri";
import { MdOutlineModeComment } from "react-icons/md";
import { Fragment } from "react";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";

const Reactions = ({ commentRef }) => {
  const scrollToComment = () => {
    if (commentRef.current) {
      commentRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <Fragment>
      <div className="grid fixed top-40 w-16">
        <div className="grid grid-flow-raw gap-4 justify-stretch top-10">
          <Tippy placement="bottom" content="&#x1F970; Like this post">
            <button className="inline-flex flex-col flex-1 items-center">
              <span className="p-2 rounded-full hover:bg-pink-100 hover:text-pink-500 transition-none">
                <RiHeart2Line size={28} />
              </span>
              <span>12</span>
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
              <span>21</span>
            </button>
          </Tippy>
          <Tippy placement="bottom" content="&#128278; Bookmark this post">
            <button className="inline-flex flex-col flex-1 items-center">
              <span className="p-2 rounded-full hover:bg-blue-100 hover:text-blue-500 transition-none">
                <RiBookmarkLine size={28} />
              </span>
              <span>6</span>
            </button>
          </Tippy>
        </div>
      </div>
    </Fragment>
  );
};

export default Reactions;
