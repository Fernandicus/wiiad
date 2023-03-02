import { useNotification } from "../../hooks/useNotification";

interface INotificationProps {
  children?: JSX.Element | null;
}

export const Notification = (props: INotificationProps) => {
  const {
    notification: { message, status },
  } = useNotification();

  return (
    <>
      {status !== "hidden" && (
        <div className="fixed p-5 inline-flex top-0 right-0">
          {status == "error" ? (
            <div className="bg-red-200   border-l-8 border border-red-400 rounded-md shadow-lg p-5">
              <h3 className="text-gray-900">{message}</h3>
              {props.children}
            </div>
          ) : status == "success" ? (
            <div className="bg-lime-200 border-l-8 border border-lime-400 rounded-md shadow-lg p-5">
              <h3 className=" text-gray-700">{message}</h3>
              {props.children}
            </div>
          ) : status == "info" ? (
            <div className="bg-blue-200   border-l-8 border border-blue-400 rounded-md shadow-lg p-5">
              <h3 className="text-gray-700 ">{message}</h3>
              {props.children}
            </div>
          ) : null}
        </div>
      )}
    </>
  );
};
