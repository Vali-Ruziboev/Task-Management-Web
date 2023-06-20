import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getCookie } from "../utils/helpers";

export const userAPI = createApi({
  reducerPath: "userAPI",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_BACKEND_URL,
    prepareHeaders: (headers) => {
      const token = decodeURIComponent(getCookie("XSRF-TOKEN"));
      if (typeof token == "string") {
        headers.set("X-XSRF-TOKEN", token);
      }
      headers.set("Accept", "application/json");
      return headers;
    },
  }),
  endpoints: (builder) => ({
    user: builder.query({
      query() {
        return {
          url: `/api/user`,
          credentials: "include",
        };
      },
    }),
  }),
});

export const { useUserQuery } = userAPI;
