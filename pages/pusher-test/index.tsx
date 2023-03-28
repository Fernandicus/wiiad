import { AdPropsPrimitives } from "@/src/modules/ad/domain/Ad";
import { IUserPrimitives } from "@/src/modules/users/user/domain/User";
import { UniqId } from "@/src/common/domain/UniqId";
import { useWatchingAd } from "@/components/hooks/ad-watcher/useWatchingAd";
import { GetServerSideProps } from "next";
import {
  insertUserWatchingAd,
  insertUserWatchingAdHandler,
} from "@/src/modules/websockets/pusher/infrastructure/pusher-container";
import getVideoDurationInSeconds from "get-video-duration";
import { MongoDB } from "@/src/common/infrastructure/MongoDB";
import { userSession } from "@/src/modules/session/infrastructure/session-container";
import { TGetSelectedWatchAdData } from "@/src/modules/campaign/use-case/SelectCampaignToWatch";
import { selectCampaignToWatch } from "@/src/modules/campaign/infrastructure/campaign-container";
import { Name } from "@/src/common/domain/Name";
import { GetAdDuration } from "@/src/modules/ad/infraestructure/GetAdDuration";
import { RefereeId } from "@/src/modules/referrals/domain/RefereeId";
import { ReferrerId } from "@/src/modules/referrals/domain/ReferrerId";
import { AnonymReferenceId } from "@/src/common/domain/AnonymReferenceId";

export interface IWatchAdPage {
  refereeId: string;
  referrerProfile: IUserPrimitives;
  ad: AdPropsPrimitives;
}

export default function Profile(props: IWatchAdPage) {
  const { disconnect, connect, connectionMessage, sendStartWatchingAdEvent } =
    useWatchingAd({ no_auth_user_id: props.refereeId });

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
            onClick={() => sendStartWatchingAdEvent(props.refereeId)}
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
  const { ad, campaignId, referrerProfile } = await getCampaignToWatch(
    referrerName,
    session
  );

  const getAdDuration = new GetAdDuration(ad.file);
  const adTimer = await getAdDuration.getAdTimer();

  const refereeId = session
    ? new RefereeId({ uniqId: new UniqId(session.id) })
    : new AnonymReferenceId(new RefereeId({ uniqId: UniqId.new() }));

  insertUserWatchingAd.insert({
    refereeId,
    referrerId: new ReferrerId({ uniqId: referrerProfile.id }),
    campaignId: campaignId,
    timer: adTimer,
  });

  return {
    props: {
      refereeId: refereeId.uniqId.id,
      referrerProfile: referrerProfile.toPrimitives(),
      ad: ad.toPrimitives(),
    } satisfies IWatchAdPage,
  };
};

async function getCampaignToWatch(
  referrerName: string,
  session: IUserPrimitives | null
): Promise<TGetSelectedWatchAdData> {
  const data = await MongoDB.connectAndDisconnect<TGetSelectedWatchAdData>(
    async () => {
      return await selectCampaignToWatch.get({
        referrerName: new Name(referrerName),
        sessionId: session ? new UniqId(session.id) : undefined,
      });
    }
  );
  return data;
}
