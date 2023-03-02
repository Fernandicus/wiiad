import { INotificationState } from "@/context/notifications/notification-reducers";
import { notificationSliceActions } from "@/context/notifications/notification-slice";
import { TNotificationState } from "@/context/store";
import { useDispatch, useSelector } from "react-redux";

interface IUseNotification {
  notification: INotificationState;
  setNotification(notification: INotificationState): void;
}

let removeNotificationTimer: NodeJS.Timeout;

export const useNotification = (): IUseNotification => {
  const { removeNotification, storeNotification } = notificationSliceActions;
  const state = useSelector((state: TNotificationState) => state.notification);
  const dispatch = useDispatch();

  const setNotification = (notification: INotificationState) => {
    dispatch(storeNotification(notification));
    if (removeNotificationTimer) clearTimeout(removeNotificationTimer);
    removeNotificationTimer = setTimeout(() => {
      dispatch(removeNotification());
    }, 5000);
  };

  return {
    notification: state,
    setNotification,
  };
};
