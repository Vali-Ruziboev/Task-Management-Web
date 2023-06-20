import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getCookie } from "../utils/helpers";

export const authAPI = createApi({
  reducerPath: "authAPI",
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
    csrf: builder.mutation({
      query() {
        return {
          url: `/sanctum/csrf-cookie`,
          credentials: "include",
        };
      },
    }),

    signup: builder.mutation({
      query(body) {
        return {
          url: `/register`,
          credentials: "include",
          method: "POST",
          body,
        };
      },
    }),

    login: builder.mutation({
      query(body) {
        return {
          url: `/login`,
          method: "POST",
          credentials: "include",
          body,
        };
      },
    }),

    logout: builder.mutation({
      query(body) {
        return {
          url: `/logout`,
          credentials: "include",
          method: "POST",
          body,
        };
      },
    }),
  }),
});

export const {
  useCsrfMutation,
  useSignupMutation,
  useLoginMutation,
  useLogoutMutation,
} = authAPI;
