import apiSlice from '../api/apiSlice';

const commentsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getComments: builder.query({}),

    getComment: builder.query({
      query: (commentId) => `/comments/${commentId}`,
    }),

    addComment: builder.mutation({
      query: ({ postId, commentData }) => (
        console.log('Id: ', commentData),
        {
          url: `comments/${postId}${
            commentData.commentId ? `/${commentData.commentId}` : ''
          }`,
          method: 'POST',
          body: { text: commentData.commentText },
        }
      ),
      keepUnusedDataFor: 1,
    }),

    updateComment: builder.mutation({}),

    delComment: builder.mutation({}),

    commmentAction: builder.mutation({
      query: ({ id }) => ({
        url: `comments/${id}/like`,
        method: 'PATCH',
      }),
    }),
  }),
});

export const {
  useCommmentActionMutation,
  useAddCommentMutation,
  useGetCommentQuery,
} = commentsApiSlice;
