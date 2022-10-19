import { persistor } from "../../store";
import apiSlice from "../api/apiSlice";
import { logout } from "./authSlice";

const authApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    logout: builder.query({
      query: () => ({
        url: "/logout",
        credentials: "include",
      }),
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        await queryFulfilled;
        dispatch(logout());
        persistor.purge();
      },
    }),
    signUp: builder.mutation({
      query: (userCredentials) => ({
        url: "/register",
        method: "POST",
        body: { ...userCredentials },
      }),
    }),
    login: builder.mutation({
      query: (userCredentials) => ({
        url: "auth",
        method: "POST",
        body: { ...userCredentials },
        credentials: "include",
      }),
    }),
  }),
});

export const { useLazyLogoutQuery, useSignUpMutation, useLoginMutation } =
  authApiSlice;
