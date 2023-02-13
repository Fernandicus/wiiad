import { createSlice } from "@reduxjs/toolkit";
import {
  notificationInitialState,
  removeNotificationReducer,
  storeNotificationReducer,
} from "./notification-reducers";

const notificationSlice = createSlice({
  name: "notification",
  initialState: notificationInitialState,
  reducers: {
    removeNotification: removeNotificationReducer,
    storeNotification: storeNotificationReducer,
  },
});

export const notificationSliceActions = notificationSlice.actions;
export const notificationSliceReducer = notificationSlice.reducer;
