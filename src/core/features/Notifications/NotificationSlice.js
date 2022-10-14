import { createSlice, nanoid } from "@reduxjs/toolkit";

const notificationtSlice = createSlice({
  name: "notification",
  initialState: [],
  reducers: {
    addNoti: {
      reducer: (state, action) => {
        state.push(action.payload);
      },
      prepare: (type, title, message) => {
        const id = nanoid();
        return { payload: { id, type, title, message } };
      },
    },
    removeNoti: {
      reducer: (state, action) => {
        return state.filter((alert) => alert.id !== action.payload);
      },
    },
  },
});
export const notificationActions = notificationtSlice.actions;
export default notificationtSlice.reducer;
