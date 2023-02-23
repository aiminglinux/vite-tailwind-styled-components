import Comment from "./Comment";
import { Xwrapper } from "react-xarrows";
import { isCommentLikedByUser } from "../../utils/string";

const CommentList = ({ comments, depth = 0, id }) => {
  return comments.map((comment) => (
    <div key={comment.id}>
      <Xwrapper>
        <Comment comment={comment} depth={depth} id={id} />
      </Xwrapper>
    </div>
  ));
};

export default CommentList;
