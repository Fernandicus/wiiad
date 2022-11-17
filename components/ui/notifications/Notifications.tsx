import React, { forwardRef, useImperativeHandle, useState } from "react";

interface INotificationProps {
  props?: string;
  children?: JSX.Element;
}

export type NotificationStatus = "error" | "info" | "success";

export interface RefNotifications {
  showNotification: (data: NotificationData) => void;
}

export interface NotificationData {
  status: NotificationStatus;
  message: string;
}

export const Notifications = forwardRef(
  (props: INotificationProps, ref: React.ForwardedRef<RefNotifications>) => {
    const [message, setMessage] = useState<NotificationData>({
      message: "",
      status: "error",
    });

    const showNotification = (data: NotificationData) => {
      console.log(data);
      setMessage(data);
    };

    useImperativeHandle(ref, () => {
      return { showNotification };
    });

    return (
      <div className="fixed p-5 inline-flex top-0 right-0">
        {message.status == "error" && message.message != "" ? (
          <div className="bg-red-200   border-l-8 border border-red-400 rounded-md shadow-lg p-5">
            <h3 className="text-gray-900">{message.message}</h3>
            {props.children}
          </div>
        ) : message.status == "success" && message.message != "" ? (
          <div className="bg-lime-200 border-l-8 border border-lime-400 rounded-md shadow-lg p-5">
            <h3 className=" text-gray-700">{message.message}</h3>
            {props.children}
          </div>
        ) : message.status == "info" && message.message != "" ? (
          <div className="bg-blue-200   border-l-8 border border-blue-400 rounded-md shadow-lg p-5">
            <h3 className="text-gray-700 ">{message.message}</h3>
            {props.children}
          </div>
        ) : null}
      </div>
    );
  }
);
