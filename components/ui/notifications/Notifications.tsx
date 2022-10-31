import React, { forwardRef, useImperativeHandle, useState } from "react";

interface Props {
  props?: string;
}

export interface RefNotifications {
  showNotification: (data: NotificationData) => void;
}

export interface NotificationData {
  status: number;
  message: string;
}

export const Notifications = forwardRef(
  (props: Props, ref: React.ForwardedRef<RefNotifications>) => {
    const [message, setMessage] = useState({ message: "", status: 0 });

    const showNotification = (data: NotificationData) => {
      console.log(data);
      setMessage(data);
    };

    useImperativeHandle(ref, () => {
      return { showNotification };
    });

    return (
      <div className="fixed p-5 inline-flex top-0 right-0">
        {message.status != 0 && message.message != "" ? (
          <div className="">
            <h3 className=" bg-red-200 text-gray-900  border-l-8 border border-red-400 rounded-md shadow-lg p-5">
              {message.message}
            </h3>
          </div>
        ) : message.status == 0 && message.message != "" ? (
          <div className="">
            <h3 className=" bg-lime-200 text-gray-700  border-l-8 border border-lime-400 rounded-md shadow-lg p-5">
              {message.message}
            </h3>
          </div>
        ) : (
          <div></div>
        )}
      </div>
    );
  }
);
