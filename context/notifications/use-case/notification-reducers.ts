import { IRemoveNotificationAction, IStoreNotificationAction } from "../domain/interfaces/INotificationAction";
import { INotificationState } from "../domain/interfaces/INotificationState";

const storeNotification = (
  state: INotificationState,
  action: IStoreNotificationAction
) => {
  state.message = action.payload.message;
  state.status = action.payload.status;
};

const removeNotification = (
  state: INotificationState,
  action: IRemoveNotificationAction
) => {
  state.message = "";
  state.status = "hidden";
};

export const notificationReducers = {
  storeNotification,
  removeNotification,
};
