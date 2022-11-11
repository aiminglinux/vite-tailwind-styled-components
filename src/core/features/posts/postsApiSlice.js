import apiSlice from "../api/apiSlice";

const postsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getPosts: builder.query({
      query: (id) => `/posts${id ? `/bookmarked/${id}` : ""}`,
      providesTags: (result, err, args) =>
        result
          ? [
              { type: "Post", id: "LIST" },
              ...result.map(({ id }) => ({ type: "Post", id })),
            ]
          : [{ type: "Post", id: "LIST" }],
    }),
    getPost: builder.query({
      query: ({ url }) => `/posts/${url}`,
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
      query: ({ meta, data }) => ({
        url: `/posts/${url}`,
        method: "PATCH",
        body: data,
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
  }),
  overrideExisting: true,
});

export const {
  useCreatePostMutation,
  useGetPostQuery,
  useGetPostsQuery,
  useUpdatePostMutation,
} = postsApiSlice;

export default postsApiSlice;
