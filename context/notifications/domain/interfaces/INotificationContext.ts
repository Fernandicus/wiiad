import { INotificationState } from "./INotificationState";

export interface INotificationContext<T> {
  notification: T;
}

export interface INotificationCtxState
  extends INotificationContext<INotificationState> {}
