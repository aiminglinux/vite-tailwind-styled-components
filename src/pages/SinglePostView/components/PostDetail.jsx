import {
  createRef,
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import {
  BsArrowsExpand,
  BsThreeDotsVertical,
  BsArrowsCollapse,
} from "react-icons/bs";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { selectCurrentUser } from "../../../core/features/auth/authSlice";
import useToggle from "../../../hooks/useToggle";
import { formatDate } from "../../../utils/string";

import Button from "../../../components/Button/Button";
import ContentMarkdown from "../../../components/ContentMarkdown/ContentMarkdown";
import LoadingSpinner from "../../../components/LoadingSpinner/LoadingSpinner";
import Modal from "../../../components/Portal/Component/Modal";
import Comment from "../../../components/Comment/Comment";
import CommentList from "../../../components/Comment/CommentList";
import CommentForm from "../../../components/Comment/CommentForm";
import EditorForm from "../../../components/Editor/EditorForm";

const PostDetail = forwardRef(({ post, onDelete }, ref) => {
  const { username, id } = useSelector(selectCurrentUser);
  const navigate = useNavigate();
  const cmtRef = useRef();
  const menuRef = useRef(null);

  const [postMenu, togglePostMenu] = useToggle(false);
  const [showComments, setShowComments] = useState(true);
  const [openModal, setOpenModal] = useState(false);

  const rootComments =
    post.comments &&
    post.comments
      .filter((comment) => comment && comment.parentComment === null)
      .sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );

  useImperativeHandle(ref, () => ({
    scrollIntoView: () => {
      cmtRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    },
  }));

  useEffect(() => {
    const closePostMenu = (e) => {
      if (menuRef.current?.contains(e.target)) return;
      togglePostMenu(false);
    };
    document.addEventListener("mousedown", closePostMenu);
    return () => document.removeEventListener("mousedown", closePostMenu);
  }, []);

  const handleDeletePost = () => {
    if (onDelete) onDelete(post.slug);
  };

  return (
    <>
      {openModal && (
        <Modal
          isOpen={openModal}
          setOn={setOpenModal}
          title={`Delete post?`}
          promptText={`Are you sure to delete this post? This will remove the post
            and can't be undone.`}
          handleAction={handleDeletePost}
        />
      )}

      <div className="border bg-white rounded-md border-solid">
        {post?.image && (
          <img
            src={post?.image?.url}
            alt={post.title}
            className="md:rounded-t-md w-full h-96 "
          />
        )}
        <div>
          <div className="p-4 md:px-12 md:py-8 space-y-4">
            <div className="flex gap-2 justify-between items-center">
              <div className="flex gap-2">
                <img
                  src={post.author.picture?.url}
                  alt={post.author.username}
                  className="w-12 h-12 rounded-full"
                />
                <div>
                  <h4
                    className="text-md font-semibold hover:text-blue-600 cursor-pointer"
                    onClick={() => navigate(`/users/${post?.author?.id}`)}
                  >
                    {post.author.name}
                  </h4>
                  <p className="text-sm text-gray-500">
                    {formatDate(post.createdAt)}
                    {formatDate(post.createdAt) !==
                      formatDate(post.updatedAt) && (
                      <span className="pl-2">{`Updated at ${formatDate(
                        post.updatedAt
                      )}`}</span>
                    )}
                  </p>
                </div>
              </div>
              {post.author.username === username && (
                <div
                  className="relative py-3 space-y-2"
                  onClick={togglePostMenu}
                  ref={menuRef}
                >
                  <BsThreeDotsVertical size={24} />
                  {postMenu && (
                    <div className="absolute border rounded-md w-32 right-2 top-8 bg-gray-300 space-y-2">
                      <ul className="">
                        <li
                          className="hover:bg-slate-200 p-2"
                          onClick={() => navigate("edit")}
                        >
                          Edit post
                        </li>
                        <li
                          onClick={() => setOpenModal(true)}
                          className="hover:bg-slate-200 p-2"
                        >
                          Delete post
                        </li>
                      </ul>
                    </div>
                  )}
                </div>
              )}
            </div>

            <h1 className="text-5xl font-semibold">{post.title}</h1>
            <div className="space-x-2">
              <a href="#!">#startup</a>
              <a href="#!">#productivity</a>
              <a href="#!">#career</a>
              <a href="#!">#news</a>
            </div>
            <div>
              <ContentMarkdown children={post.body} />
            </div>
          </div>
        </div>
        <div
          id="comment-section"
          className="border-t p-4 md:px-12 md:py-8 space-y-4"
          ref={cmtRef}
        >
          <div className="flex justify-between">
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-semibold">
                Comments ({post.comments.length})
              </h2>
              <button
                className="p-4 hover:bg-indigo-100 hover:rounded-md"
                onClick={() => setShowComments(!showComments)}
              >
                {showComments ? (
                  <BsArrowsExpand size={16} />
                ) : (
                  <BsArrowsCollapse size={16} />
                )}
              </button>
            </div>
            <Button>Subcribe</Button>
          </div>
          {showComments && (
            <div className="space-y-4">
              <CommentForm />
              <CommentList comments={rootComments} id={id} />
              {/* {rootComments.map((comment) => (
                <Comment comment={comment} />
              ))} */}
            </div>
          )}
        </div>
      </div>
    </>
  );
});

export default PostDetail;
