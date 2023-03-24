import React from 'react';
import { useParams } from 'react-router';
import { useGetCommentQuery } from '../../core/features/comment/commentsApiSlice';

import Comment from '../../components/Comment/Comment';

const SingleCommentView = () => {
  const { commentId } = useParams();
  const { data: comment } = useGetCommentQuery(commentId);
  console.log(comment);
  return <Comment comment={comment} />;
};

export default SingleCommentView;
