import { LoginQueries } from "@/src/common/domain/LoginQueries";
import { MongoDB } from "@/src/common/infrastructure/MongoDB";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { AuthController } from "@/src/common/infrastructure/controllers/AuthController";
import { IGenericUserPrimitives } from "@/src/common/domain/interfaces/GenericUser";
import { AdPropsPrimitives } from "@/src/modules/ad/domain/Ad";
import {
  IWatchCampaignData,
  WatchCampaignsController,
} from "@/src/common/infrastructure/controllers/WatchCampaignsController";
import AdView from "../../components/ui/watch-ad/AdView";
import { RoleType } from "@/src/common/domain/Role";
import { ICampaignPrimitives } from "@/src/modules/campaign/domain/Campaign";
import { userSession } from "@/src/modules/session/infrastructure/session-container";
import { UserProfile } from "../../components/ui/profile/user/UserProfile";
import { AdvertiserHeader } from "../../components/ui/profile/advertiser/AdvertiserHeader";
import { useEffect, useRef, useState } from "react";
import { adFinderHandler } from "@/src/modules/ad/infraestructure/ad-container";
import { ApiRoutes } from "@/src/utils/ApiRoutes";
import {
  NotificationData,
  Notifications,
  RefNotifications,
} from "../../components/ui/notifications/Notifications";
import { IUserPrimitives } from "@/src/modules/user/domain/User";
import { Logout } from "../../components/ui/login/Logout";
import { findCampaignHandler } from "@/src/modules/campaign/infrastructure/campaign-container";
import CampaignsPage from "../campaigns";
import { AdvertiserDataController } from "@/src/modules/advertiser/controller/AdvertiserDataController";
import { LogStates } from "@/src/common/domain/LogStates";

export interface IWatchCampaignPage {
  user: IGenericUserPrimitives | null;
  campaign: ICampaignPrimitives | ICampaignPrimitives[];
  ad: AdPropsPrimitives | AdPropsPrimitives[];
  referrer: IGenericUserPrimitives | null;
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
  } catch (err) {
    console.error(err);
    await MongoDB.disconnect();
    return {
      props: {},
      redirect: { destination: "/", permanent: false },
    };
  }
};

async function getCampaignToWatch(
  loginQueries: LoginQueries,
  session: IGenericUserPrimitives | null
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
  user: IGenericUserPrimitives,
  loginQueries: LoginQueries
): boolean {
  return user.name == loginQueries.userName;
}
