import Xarrow from "react-xarrows";
import Comment from "./Comment";

const CommentList = ({ comments, parentCommentRef }) => {
  console.log("Parent: ", parentCommentRef?.current);
  return comments.map((comment, i) => (
    <div key={comment.id}>
      <Comment comment={comment} />
    </div>
  ));
};

export default CommentList;
