import { sendWatchingAdActionHandler } from "@/components/src/websocket/pusher-front/infrastructure/front-watching-ad-container";
import { useState } from "react";
import { useNotification } from "../useNotification";

type TUseWatchingAdActionsResponse = {
  startWatchingAd: () => Promise<void>;
  finishWatchingAd: () => void;
};

type TUseWatchingAdActionsProps = {
  refereeValue: string;
  referrerValue: string;
};

export const useWatchingAdActions = (
  {referrerValue,refereeValue}: TUseWatchingAdActionsProps
): TUseWatchingAdActionsResponse => {
  const [connectionMessage, setConnectionMessage] = useState("");
  const { setNotification } = useNotification();

  const startWatchingAd = async () => {
    sendWatchingAdActionHandler.startWatchingAd({
      refereeValue,
      referrerValue,
    });
    setNotification({ message: "Waiting response ...", status: "info" });
  };

  const finishWatchingAd = async () => {
    sendWatchingAdActionHandler.finishWatchingAd({
      refereeValue,
      referrerValue,
    });
    setNotification({ message: "Finish watching add", status: "info" });
  };

  return {
    startWatchingAd,
    finishWatchingAd,
  };
};
