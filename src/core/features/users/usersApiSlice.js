import apiSlice from "../api/apiSlice";
import { setCredentials } from "../auth/authSlice";

const usersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUser: builder.query({
      query: (username) => `/users/${username}`,
      providesTags: (result, err, args) =>
        result
          ? [{ type: "User", id: result.id }]
          : [{ type: "User", id: "LIST" }],
    }),
    updateUser: builder.mutation({
      query: (body) => ({
        url: `/users/${body.id}`,
        body,
        method: "PATCH",
      }),
      invalidatesTags: (result, err, { id }) => [{ type: "User", id }],
      async onQueryStarted(body, { dispatch, queryFulfilled }) {
        const { data: updatedUser } = await queryFulfilled;
        dispatch(setCredentials(body));
        const { username } = body;
        dispatch(
          usersApiSlice.util.updateQueryData(
            "getUser",
            username,
            (draftUser) => {
              Object.assign(draftUser, updatedUser);
            }
          )
        );
      },
    }),
  }),
  overrideExisting: true,
});

export const { useUpdateUserMutation, useGetUserQuery } = usersApiSlice;

export default usersApiSlice;
