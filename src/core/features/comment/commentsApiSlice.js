import apiSlice from '../api/apiSlice';

const commentsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getComments: builder.query({}),

    addComment: builder.mutation({
      query: ({ postId, commentText }) =>
        // console.log('Id: ', commentData),
        ({
          url: `comments/${postId}`,
          method: 'POST',
          body: { text: commentText },
        }),
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

export const { useCommmentActionMutation, useAddCommentMutation } =
  commentsApiSlice;
