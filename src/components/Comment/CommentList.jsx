import Comment from './Comment';

const CommentList = ({ comments, depth = 0, id }) => {
  return comments.map((comment) => (
    <div key={comment.id}>
      <Comment comment={comment} depth={depth} id={id} />
    </div>
  ));
};

export default CommentList;
