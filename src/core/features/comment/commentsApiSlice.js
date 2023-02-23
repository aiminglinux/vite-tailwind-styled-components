import { result } from "lodash";
import apiSlice from "../api/apiSlice";

const commentsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getComments: builder.query({}),
    addComment: builder.mutation({}),

    updateComment: builder.mutation({}),

    delComment: builder.mutation({}),

    commmentAction: builder.mutation({
      query: ({ id }) => ({
        url: `comments/${id}/like`,
        method: "PATCH",
      }),
      //   invalidatesTags: (result, err, {id}) => [{ type: 'Comment', id}],
      //   async onQueryStarted({id, isLiked}, {dispatch, queryFulfilled}) {
      //     const patchResult = dispatch(
      //         commentsApiSlice.util.updateQueryData('getComments', parentPost, draftComments => {

      //         })
      //     )
      //   }
    }),
  }),
});

export const { useCommmentActionMutation } = commentsApiSlice;
