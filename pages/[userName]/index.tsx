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

export const getServerSideProps: GetServerSideProps = async (context) => {
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
): Promise<IWatchCampaignData> {
  const data = await MongoDB.connectAndDisconnect<IWatchCampaignData>(
    async () => {
      return await WatchCampaignsController.forInfluencer({
        influencerName: loginQueries.userName,
        session,
      });
    }
  );
  return data;
}
