import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getCookie } from "../utils/helpers";

export const taskAPI = createApi({
  reducerPath: "taskAPI",
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
  tagTypes: ["Tasks"],
  endpoints: (builder) => ({
    tasks: builder.query({
      query() {
        return {
          url: `/api/tasks`,
          credentials: "include",
        };
      },
      providesTags: ["Tasks"],
    }),

    createTask: builder.mutation({
      query: (body) => ({
        url: "/api/tasks",
        method: "POST",
        body: body,
        credentials: "include",
      }),
      invalidatesTags: ["Tasks"],
    }),

    editTask: builder.mutation({
      query: (body) => ({
        url: `/api/tasks/${body.id}`,
        method: "PUT",
        body: body,
        credentials: "include",
      }),
      invalidatesTags: ["Tasks"],
    }),

    deleteTask: builder.mutation({
      query: (id) => ({
        url: `/api/tasks/${id}`,
        method: "DELETE",
        credentials: "include",
      }),
    }),

    reorderTask: builder.mutation({
      query: (tasks) => ({
        url: `/api/tasks`,
        method: "PUT",
        body: tasks,
        credentials: "include",
      }),
      invalidatesTags: ["Tasks"],
    }),
  }),
});

export const {
  useTasksQuery,
  useCreateTaskMutation,
  useEditTaskMutation,
  useDeleteTaskMutation,
  useReorderTaskMutation,
} = taskAPI;
