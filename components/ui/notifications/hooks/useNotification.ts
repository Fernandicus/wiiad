import { INotificationCtxState } from "@/context/notifications/domain/interfaces/INotificationContext";
import { INotificationState } from "@/context/notifications/domain/interfaces/INotificationState";
import {
  removeNotification,
  storeNotification,
} from "@/context/notifications/infrastructure/notification-slice";
import { useDispatch, useSelector } from "react-redux";

interface IUseNotification {
  notification: INotificationState;
  setNotification(notification: INotificationState): void;
}

let removeNotificationTimer: NodeJS.Timeout;

export const useNotification = (): IUseNotification => {
  const state = useSelector(
    (state: INotificationCtxState) => state.notification
  );
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
