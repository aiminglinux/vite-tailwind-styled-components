import Comment from "./Comment";
import { Xwrapper } from "react-xarrows";

const CommentList = ({ comments, depth = 0 }) => {
  return comments.map((comment) => (
    <div key={comment.id}>
      <Xwrapper>
        <Comment comment={comment} depth={depth} />
      </Xwrapper>
    </div>
  ));
};

export default CommentList;
