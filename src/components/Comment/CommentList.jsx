import Comment from "./Comment";

const CommentList = ({ comments, parentCommentRef }) => {
  return comments.map((comment) => (
    <div key={comment.id}>
      <Comment comment={comment} />
    </div>
  ));
};

export default CommentList;
