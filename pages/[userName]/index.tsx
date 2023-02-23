import { LoginQueries } from "@/src/common/domain/LoginQueries";
import { MongoDB } from "@/src/common/infrastructure/MongoDB";
import { GetServerSideProps } from "next";
import { AdPropsPrimitives } from "@/src/modules/ad/domain/Ad";
import {
  IWatchCampaignData,
  WatchCampaignsController,
} from "@/src/common/infrastructure/controllers/WatchCampaignsController";
import AdView from "../../components/ui/pages/[userName]/AdView";
import { ICampaignPrimitives } from "@/src/modules/campaign/domain/Campaign";
import { userSession } from "@/src/modules/session/infrastructure/session-container";
import { IUserPrimitives } from "@/src/modules/users/user/domain/User";
import { IReqAndRes } from "@/src/modules/session/domain/interfaces/IAuthCookies";

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
    <AdView
      user={user}
      campaign={campaign as ICampaignPrimitives}
      ad={ad as AdPropsPrimitives}
      referrer={referrer!}
    />
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { query } = context;
  const queryParams = new LoginQueries(query);

  try {
    return await getSSPropsData({ context, queryParams });
  } catch (err) {
    console.error(err);
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
  if (session && isUserNamePath(session, queryParams))
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

function isUserNamePath(
  user: IUserPrimitives,
  loginQueries: LoginQueries
): boolean {
  return user.name == loginQueries.userName;
}
