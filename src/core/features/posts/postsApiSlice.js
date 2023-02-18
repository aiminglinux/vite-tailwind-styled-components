import apiSlice from "../api/apiSlice";

const postsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getPosts: builder.query({
      query: () => `/posts`,
      providesTags: (result, err, args) =>
        result
          ? [
              { type: "Post", id: "LIST" },
              ...result.map(({ id }) => ({ type: "Post", id })),
            ]
          : [{ type: "Post", id: "LIST" }],
    }),
    getPost: builder.query({
      query: (postId) => `/posts/${postId}`,
      providesTags: (result, err, args) =>
        result
          ? [{ type: "Post", id: "result.id" }]
          : [{ type: "Post", id: "LIST" }],
    }),
    createPost: builder.mutation({
      query: ({ ...data }) => ({
        url: "/posts",
        method: "POST",
        body: { ...data },
      }),
      invalidatesTags: (result, err, args) =>
        result
          ? [
              { type: "Comment", id: "LIST" },
              { type: "Post", id: result.id },
            ]
          : [{ type: "Post", id: "List" }],
    }),
    updatePost: builder.mutation({
      query: ({ meta, patch }) => ({
        url: `/posts/${meta.url}`,
        method: "PATCH",
        body: patch,
      }),
      invalidatesTags: (result, err, { meta }) => [{ type: Post, id: meta.id }],
      async onQueryStarted({ meta: { url } }, { dispatch, queryFulfilled }) {
        const { data: updatePost } = await queryFulfilled;
        dispatch(
          postsApiSlice.util.updateQueryData(
            "getPost",
            { url },
            (draftPost) => {
              Object.assign(draftPost, updatePost);
            }
          )
        );
      },
    }),
    deletePost: builder.mutation({
      query: ({ url }) => ({
        url: `posts/${url}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, err, { id }) => [{ type: "Post", id: id }],
    }),
    // postActions: builder.mutation({
    //   query: ({postId, isLiked}) => ({
    //     url: `/posts/${postId}/:${action}`,
    //     method: 'PATCH',
    //     body: {isLiked}
    //   }),
    //   invalidatesTags: (result, err, args) => [{type: 'Post', id: postId}],
    //   async onQueryStarted({postId}, {dispatch, queryFulfilled}) {
    //     const {data: updatedPost} = await queryFulfilled

    //   }
    // })
  }),
  overrideExisting: true,
});

export const {
  useCreatePostMutation,
  useGetPostQuery,
  useGetPostsQuery,
  useUpdatePostMutation,
  useDeletePostMutation,
} = postsApiSlice;

export default postsApiSlice;
