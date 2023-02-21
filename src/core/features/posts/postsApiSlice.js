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
          : [{ type: "Post", id: "LIST" }],
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
    postActions: builder.mutation({
      query: ({ postId, type }) => ({
        url: `/posts/${postId}/${type}`,
        method: "PATCH",
      }),
      invalidatesTags: (result, err, args) => [{ type: "Post", id: postId }],
      async onQueryStarted(
        { postId, isLikedOrBookmarked, userId, actionKey },
        { dispatch, queryFulfilled }
      ) {
        const patchResult = dispatch(
          postsApiSlice.util.updateQueryData("getPost", postId, (draftPost) => {
            // return console.log(actionKey);
            isLikedOrBookmarked
              ? (draftPost[actionKey] = [
                  ...draftPost[actionKey].filter((id) => id !== userId),
                ])
              : (draftPost[actionKey] = [...draftPost[actionKey], userId]);
          })
        );
        try {
          await queryFulfilled;
        } catch {
          patchResult.undo();
          dispatch(
            postsApiSlice.util.invalidateTags([{ type: "Post", id: postId }])
          );
        }
      },
    }),
  }),
  overrideExisting: true,
});

export const {
  useCreatePostMutation,
  useGetPostQuery,
  useGetPostsQuery,
  useUpdatePostMutation,
  useDeletePostMutation,
  usePostActionsMutation,
} = postsApiSlice;

export default postsApiSlice;
