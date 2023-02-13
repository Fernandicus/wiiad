import { PayloadAction } from "@reduxjs/toolkit";

type TNotificationStatus = "error" | "info" | "success" | "hidden";

export interface INotificationState {
  status: TNotificationStatus;
  message: string;
}

export const notificationInitialState: INotificationState = {
  message: "",
  status: "hidden",
};

export const storeNotificationReducer = (
  state: INotificationState,
  action: PayloadAction<INotificationState>
) => {
  state.message = action.payload.message;
  state.status = action.payload.status;
};

export const removeNotificationReducer = (
  state: INotificationState,
  action: PayloadAction
) => {
  state.message = "";
  state.status = "hidden";
};
