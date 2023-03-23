import { AdPropsPrimitives } from "@/src/modules/ad/domain/Ad";
import { ICampaignPrimitives } from "@/src/modules/campaign/domain/Campaign";
import { IUserPrimitives } from "@/src/modules/users/user/domain/User";
import { UniqId } from "@/src/utils/UniqId";
import { useWatchingAd } from "@/components/hooks/ad-watcher/useWatchingAd";
import { GetServerSideProps } from "next";
import { AdSegments } from "@/src/modules/ad/domain/value-objects/AdSegments";
import {
  insertUserWatchingAdHandler,
  sendWSSEventHandler,
} from "@/src/modules/websockets/pusher/infrastructure/pusher-container";
import getVideoDurationInSeconds from "get-video-duration";

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
  const { disconnect, connect, connectionMessage, sendStartWatchingAdEvent } =
    useWatchingAd({ no_auth_user_id: noSessionUser.user_id });

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
            onClick={() => sendStartWatchingAdEvent(noSessionUser.user_id)}
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

export const getServerSideProps: GetServerSideProps = async (context) => {
  const ad: AdPropsPrimitives = {
    id: UniqId.generate(),
    advertiserId: UniqId.generate(),
    title: "Title ...",
    description: "Description ...",
    segments: AdSegments.withAllAvailables().segments,
    redirectionUrl: "www.redirectionUrl....",
    file: "fileUrl",
  };

  const adDuration = await getVideoDurationInSeconds(
    "https://res.cloudinary.com/fernanprojects/video/upload/f_mp4/q_auto/du_30/c_scale,h_405,w_750/fps_30/v1/advertisers/777b5fec-dee5-4bde-a0c3-c32a36aa0184/ads/videos/f0pgpzw3epvfw0h28fuc.mp4"
  );

  //Todo: 1. On insert campaign in the watching ad list
  //?     2 => pages/api/v1/channel-events/index.ts

  const userId = "userId-1234";

  insertUserWatchingAdHandler.insert({
    campaignId: "campaignId-1234",
    userId,
    timer: adDuration,
   /*  onTimeout: async () => {
      await sendWSSEventHandler.finishWatchingAd(userId);
    }, */
  });

  return {
    props: {
      ad,
    },
  };
};
