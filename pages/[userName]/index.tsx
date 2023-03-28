import { LoginQueries } from "@/src/common/domain/LoginQueries";
import { MongoDB } from "@/src/common/infrastructure/MongoDB";
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import { AdPropsPrimitives } from "@/src/modules/ad/domain/Ad";
import {
  TGetSelectedWatchAdData,
  SelectCampaignToWatch,
} from "@/src/modules/campaign/use-case/SelectCampaignToWatch";
import AdView from "../../components/ui/pages/watch-ad/AdView";
import { ICampaignPrimitives } from "@/src/modules/campaign/domain/Campaign";
import { userSession } from "@/src/modules/session/infrastructure/session-container";
import { IUserPrimitives } from "@/src/modules/users/user/domain/User";
import { IReqAndRes } from "@/src/modules/session/domain/interfaces/IAuthCookies";
import { Notification } from "@/components/ui/notifications/Notification";
import { AdViewPage } from "@/components/ui/pages/watch-ad/AdViewPage";
import { AdFileUrl } from "@/src/modules/ad/domain/value-objects/AdFileUrl";
import { GetAdDuration } from "@/src/modules/ad/infraestructure/GetAdDuration";
import { UniqId } from "@/src/common/domain/UniqId";
import {
  insertUserWatchingAd,
  insertUserWatchingAdHandler,
} from "@/src/modules/websockets/pusher/infrastructure/pusher-container";
import { Query } from "@/src/common/domain/types/types";
import { Name } from "@/src/common/domain/Name";
import { selectCampaignToWatch } from "@/src/modules/campaign/infrastructure/campaign-container";
import { ReferrerId } from "@/src/modules/referrals/domain/ReferrerId";
import { RefereeId } from "@/src/modules/referrals/domain/RefereeId";
import { AnonymReferenceId } from "@/src/common/domain/AnonymReferenceId";

export interface IWatchCampaignPage {
  user: IUserPrimitives | null;
  campaign: ICampaignPrimitives | ICampaignPrimitives[];
  ad: AdPropsPrimitives | AdPropsPrimitives[];
  referrer: IUserPrimitives | null;
}

export default function Profile({
  user,
  ad,
  campaign,
  referrer,
}: IWatchCampaignPage) {
  return (
    <AdViewPage
      ad={ad as AdPropsPrimitives}
      campaign={campaign as ICampaignPrimitives}
      referrer={referrer!}
      user={user}
    />
  );
}

function getReferrerName(context: GetServerSidePropsContext): string {
  return context.resolvedUrl.split("/")[1];
}

function getRefereeId(session: IUserPrimitives | null): RefereeId {
  return session
    ? new RefereeId({ uniqId: new UniqId(session.id) })
    : new AnonymReferenceId(new RefereeId({ uniqId: UniqId.new() }));
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = userSession.getFromServer(context);
  const referrerName = getReferrerName(context);
  const refereeId = getRefereeId(session);

  console.log(referrerName);

  const data = await getCampaignToWatch(referrerName, session);
  const getAdDuration = new GetAdDuration(data.ad.file);
  const adTimer = await getAdDuration.getAdTimer();

  insertUserWatchingAd.insert({
    refereeId,
    referrerId: new ReferrerId({ uniqId: data.referrerProfile.id }),
    campaignId: data.campaignId,
    timer: adTimer,
  });

  return {
    props: {
      referrerProfile: data.referrerProfile,
      refereeId,
      ad: data.ad,
    },
  };
};

async function getCampaignToWatch(
  referrerName: string,
  session: IUserPrimitives | null
): Promise<TGetSelectedWatchAdData> {
  const data = await MongoDB.connectAndDisconnect<TGetSelectedWatchAdData>(
    async () => {
      //Todo: Implement a better algorithm to select an Ad inside the get method
      return await selectCampaignToWatch.get({
        referrerName: new Name(referrerName),
        sessionId: session ? new UniqId(session.id) : undefined,
      });
    }
  );
  return data;
}

/* export const getServerSideProps: GetServerSideProps = async (context) => {
  const { query } = context;
  const queryParams = new LoginQueries(query);

  try {
    return await getSSPropsData({ context, queryParams });
  } catch (err) {
    await MongoDB.disconnect();
    return {
      props: {},
      redirect: { destination: "/", permanent: false },
    };
  }
};

async function getSSPropsData(params: {
  context: IReqAndRes;
  queryParams: LoginQueries;
}) {
  const { queryParams, context } = params;
  const session = userSession.getFromServer(context);

  if (session && session.name == queryParams.userName)
    return {
      props: {},
      redirect: { destination: "/profile", permanent: false },
    };

  const { ad, activeCampaign, referrer } = await getCampaignToWatch(
    queryParams,
    session
  );

  return {
    props: {
      user: session,
      campaign: activeCampaign,
      ad,
      referrer: {
        email: referrer.email,
        id: referrer.id,
        name: referrer.name,
        role: referrer.role,
        profilePic: referrer.profilePic,
      },
    } as IWatchCampaignPage,
  };
}

async function getCampaignToWatch(
  loginQueries: LoginQueries,
  session: IUserPrimitives | null
): Promise<TGetSelectedWatchAdData> {
  const data = await MongoDB.connectAndDisconnect<TGetSelectedWatchAdData>(
    async () => {
      return await SelectCampaignToWatch.forInfluencer({
        influencerName: loginQueries.userName,
        session,
      });
    }
  );
  return data;
}
 */
