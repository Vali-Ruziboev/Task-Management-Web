import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/dist/query";
import { authAPI } from "../services/authAPI";
import { userAPI } from "../services/userAPI";
import taskReducer from "../features/task/taskSlice";
import taskModalReducer from "../features/modal/taskModalSlice";
import { taskAPI } from "../services/taskAPI";

export const store = configureStore({
  reducer: {
    task: taskReducer,
    taskModal: taskModalReducer,
    [authAPI.reducerPath]: authAPI.reducer,
    [userAPI.reducerPath]: userAPI.reducer,
    [taskAPI.reducerPath]: taskAPI.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(authAPI.middleware)
      .concat(userAPI.middleware)
      .concat(taskAPI.middleware),
});

setupListeners(store.dispatch);
