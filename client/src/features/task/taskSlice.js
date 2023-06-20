import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";

export const columns = {
  TO_DO: 0,
  IN_PROGRESS: 1,
  COMPLETED: 2,
};

const initialState = {
  values: {
    [columns.TO_DO]: [],
    [columns.IN_PROGRESS]: [],
    [columns.COMPLETED]: [],
  },
};

export const taskSlice = createSlice({
  name: "task",
  initialState,
  reducers: {
    add: (state, action) => {
      const { title, description } = action.payload;
      const todos = state.values[columns.TO_DO];
      state.values[columns.TO_DO].push({
        id: uuidv4(),
        title,
        description,
        index: todos.length,
        column_id: columns.TO_DO,
      });
    },

    remove: (state, action) => {
      let tasks = state.values[action.payload.column_id];
      tasks = tasks.filter((task) => task.id !== action.payload.id);

      state.values[action.payload.column_id] = tasks.map((task, i) => ({
        ...task,
        index: i,
      }));
    },

    update: (state, action) => {
      state.values[action.payload.column_id] = state.values[
        action.payload.column_id
      ].map((task) => (task.id === action.payload.id ? action.payload : task));
    },

    reorder: (state, action) => {
      const source = action.payload.source;
      const destination = action.payload.destination;

      if (source.droppableId === destination.droppableId) {
        if (source.index !== destination.index) {
          const tasks = state.values[destination.droppableId];
          const task = tasks.splice(source.index, 1)[0];
          tasks.splice(destination.index, 0, task);

          state.values[destination.droppableId] = tasks.map((task, i) => ({
            ...task,
            index: i,
          }));
        }
      } else {
        const sourceTasks = state.values[source.droppableId];
        const destTasks = state.values[destination.droppableId];

        const task = sourceTasks.splice(source.index, 1)[0];

        state.values[source.droppableId] = sourceTasks.map((task, i) => ({
          ...task,
          index: i,
        }));

        destTasks.splice(destination.index, 0, {
          ...task,
          column_id: destination.droppableId,
        });

        state.values[destination.droppableId] = destTasks.map((task, i) => ({
          ...task,
          index: i,
        }));
      }
    },

    reset: (state, action) => {
      if (action.payload) {
        let tasks = { ...initialState.values };

        action.payload.map((task) => {
          if (tasks[task.column_id]) {
            tasks[task.column_id] = [...tasks[task.column_id], task];
          } else {
            tasks[task.column_id] = [task];
          }
        });
        state.values = tasks;
      } else {
        state.values = initialState;
      }
    },
  },
});

export const { add, update, remove, reorder, reset } = taskSlice.actions;

export default taskSlice.reducer;
