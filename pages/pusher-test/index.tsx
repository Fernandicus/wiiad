import { LoginQueries } from "@/src/common/domain/LoginQueries";
import { MongoDB } from "@/src/common/infrastructure/MongoDB";
import { GetServerSideProps } from "next";
import { AdPropsPrimitives } from "@/src/modules/ad/domain/Ad";
import {
  IWatchCampaignData,
  WatchCampaignsController,
} from "@/src/common/infrastructure/controllers/WatchCampaignsController";
import AdView from "../../components/ui/pages/watch-ad/AdView";
import { ICampaignPrimitives } from "@/src/modules/campaign/domain/Campaign";
import { userSession } from "@/src/modules/session/infrastructure/session-container";
import { IUserPrimitives } from "@/src/modules/users/user/domain/User";
import { IReqAndRes } from "@/src/modules/session/domain/interfaces/IAuthCookies";
import { Notification } from "@/components/ui/notifications/Notification";
import { AdViewPage } from "@/components/ui/pages/watch-ad/AdViewPage";
import { useEffect, useState } from "react";
import Pusher, { Channel } from "pusher-js";
import { UniqId } from "@/src/utils/UniqId";
import { WebSocketEvent } from "@/src/modules/websockets/pusher/domain/WebSocketEventName";
import { WebSocketChannels } from "@/src/modules/websockets/pusher/domain/WebSocketChannel";
import { useAdWatcher } from "@/components/hooks/ad-watcher/useAdWatcher";
import { PusherWebSocketJS } from "@/components/src/websocket/pusher-front/infrastructure/FrontPusherWebSocket";
import { frontWebSocket } from "@/components/src/websocket/pusher-front/infrastructure/front-pusher-container";

export interface IWatchCampaignPage {
  user: IUserPrimitives | null;
  campaign: ICampaignPrimitives | ICampaignPrimitives[];
  ad: AdPropsPrimitives | AdPropsPrimitives[];
  referrer: IUserPrimitives | null;
}

const noSessionUser = {
  user_id: "anonimous_" + UniqId.generate(),
};

export default function Profile() {
  const { closePusher, connectPusher, connectionMessage, sendAdWatchedEvent } =
    useAdWatcher(
      frontWebSocket({
        channelAuthParams: noSessionUser,
        userAuthParams: noSessionUser,
      })
    );

  return (
    <div className="h-screen flex flex-col text-center">
      <div className="py-5">
        <div className="h-20 flex items-center justify-center">
          <div className="space-y-5">
            <h1 className="font-bold text-lg">PUSHER TEST</h1>
            <div className="space-x-10">
              <button
                className="bg-red-100 text-red-500 font-bold px-2 py-1 rounded-lg"
                onClick={closePusher}
              >
                Close Pusher
              </button>
              <button
                className="bg-green-500 text-lime-100 font-bold px-2 py-1 rounded-lg"
                onClick={connectPusher}
              >
                Connect Pusher
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full flex-1 bg-slate-200 ">
        <div className="p-20">
          <button
            className="text-center bg-blue-500 px-3 py-1 rounded-lg text-white"
            onClick={() => sendAdWatchedEvent(noSessionUser.user_id)}
          >
            Event
          </button>
        </div>
        <div className="h-full text-center">
          <div>
            <p>{connectionMessage}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
