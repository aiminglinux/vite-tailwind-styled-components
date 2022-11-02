import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { persistor } from "../../store";
import { logout, setAuthModal, setToken } from "../auth/authSlice";

const baseQuery = fetchBaseQuery({
  baseUrl: "http://localhost:5000",
  credentials: "include",
  prepareHeaders: (headers, { getState }) => {
    const token = getState().auth.token;
    if (token) headers.set("authorization", `Bearer ${token}`);
    return headers;
  },
});

const baseQueryWithReauth = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);

  if (result?.error?.status === 403) {
    const refreshResult = await baseQuery("/refresh", api, extraOptions);

    if (refreshResult?.data) {
      api.dispatch(setToken(refreshResult.data));
      result = await baseQuery(args, api, extraOptions);
    } else {
      await baseQuery("/logout", api, extraOptions);
      api.dispatch(logout());
      persistor.purge();

      api.dispatch(setAuthModal(true));
    }
  }

  return result;
};

const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({}),
  tagTypes: ["User"],
  keepUnusedDataFor: 5,
});

export default apiSlice;
