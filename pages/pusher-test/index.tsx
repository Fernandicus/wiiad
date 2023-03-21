import { AdPropsPrimitives } from "@/src/modules/ad/domain/Ad";
import { ICampaignPrimitives } from "@/src/modules/campaign/domain/Campaign";
import { IUserPrimitives } from "@/src/modules/users/user/domain/User";
import { UniqId } from "@/src/utils/UniqId";
import { frontWebSocket } from "@/components/src/websocket/pusher-front/infrastructure/front-pusher-container";
import { useWatchingAd } from "@/components/hooks/ad-watcher/useWatchingAd";

export interface IWatchCampaignPage {
  user: IUserPrimitives | null;
  campaign: ICampaignPrimitives | ICampaignPrimitives[];
  ad: AdPropsPrimitives | AdPropsPrimitives[];
  referrer: IUserPrimitives | null;
}

const noSessionUser = {
  user_id: "anon_" + UniqId.generate(),
};

export default function Profile() {
  const { disconnect, connect, connectionMessage, sendAdWatchedEvent } =
    useWatchingAd({no_auth_user_id: noSessionUser.user_id});

  return (
    <div className="h-screen flex flex-col text-center">
      <div className="py-5">
        <div className="h-20 flex items-center justify-center">
          <div className="space-y-5">
            <h1 className="font-bold text-lg">PUSHER TEST</h1>
            <div className="space-x-10">
              <button
                className="bg-red-100 text-red-500 font-bold px-2 py-1 rounded-lg"
                onClick={disconnect}
              >
                Close Pusher
              </button>
              <button
                className="bg-green-500 text-lime-100 font-bold px-2 py-1 rounded-lg"
                onClick={connect}
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