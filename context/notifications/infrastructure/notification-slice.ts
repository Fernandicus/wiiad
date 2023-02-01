import { createSlice } from "@reduxjs/toolkit";
import { notificationInitialState } from "../domain/NotificationInitialState";
import { notificationReducers } from "../use-case/notification-reducers";

export const notificationSlice = createSlice({
  name: "notification",
  initialState: notificationInitialState,
  reducers: notificationReducers,
});

export const { storeNotification, removeNotification } = notificationSlice.actions;
