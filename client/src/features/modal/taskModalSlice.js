import { createSlice } from "@reduxjs/toolkit";

export const actions = {
  REMOVE: 0,
  EDIT: 1,
  ADD: 2,
};

const initialState = {
  remove: null,
  edit: null,
  add: false,
};

export const taskModalSlice = createSlice({
  name: "taskModal",
  initialState,
  reducers: {
    open: (state, action) => {
      switch (action.payload.type) {
        case actions.EDIT:
          state.remove = null;
          state.add = false;
          state.edit = action.payload.data;
          break;

        case actions.REMOVE:
          state.add = false;
          state.edit = null;
          state.remove = action.payload.data;
          break;

        default:
          state.edit = null;
          state.remove = null;
          state.add = true;
          break;
      }
    },

    close: (state) => {
      return (state = initialState);
    },
  },
});

export const { open, close } = taskModalSlice.actions;

export default taskModalSlice.reducer;
