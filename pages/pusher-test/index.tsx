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
import { LoginQueries } from "@/src/common/domain/LoginQueries";
import {
  IWatchCampaignData,
  WatchCampaignsController,
} from "@/src/common/infrastructure/controllers/WatchCampaignsController";
import { MongoDB } from "@/src/common/infrastructure/MongoDB";
import { userSession } from "@/src/modules/session/infrastructure/session-container";

export interface IWatchAdPage {
  userId: string;
  ad: AdPropsPrimitives;
}

export default function Profile(props: {
  userId: string;
  ad: AdPropsPrimitives;
}) {
  const { disconnect, connect, connectionMessage, sendStartWatchingAdEvent } =
    useWatchingAd({ no_auth_user_id: props.userId });

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
            onClick={() => sendStartWatchingAdEvent(props.userId)}
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


  const session = userSession.getFromServer(context);
  const referrerName = context.resolvedUrl.split("/")[1];
  const data = await getCampaignToWatch(referrerName, session);

  const isVideo = data.ad.file.includes(".mp4");
  const adDuration = isVideo
    ? await getVideoDurationInSeconds(data.ad.file)
    : undefined;

  const userId = session ? session.id : `anonimous-` + UniqId.generate();

  insertUserWatchingAdHandler.insert({
    userId,
    campaignId: data.activeCampaign.id,
    timer: adDuration,
  });

  return {
    props: {
      userId,
      ad: data.ad,
    },
  };
};

async function getCampaignToWatch(
  referrerName: string,
  session: IUserPrimitives | null
): Promise<IWatchCampaignData> {
  const data = await MongoDB.connectAndDisconnect<IWatchCampaignData>(
    async () => {
      return await WatchCampaignsController.forInfluencer({
        influencerName: referrerName,
        session,
      });
    }
  );
  return data;
}
