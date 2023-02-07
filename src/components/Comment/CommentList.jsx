import Comment from "./Comment";

const CommentList = ({ comments }) => {
  return comments.map((comment) => (
    <div key={comment.id}>
      <Comment {...comments} />
    </div>
  ));
};

export default CommentList;
