type TNotificationStatus = "error" | "info" | "success" | "hidden";

export interface INotificationState {
  status: TNotificationStatus;
  message: string;
}
