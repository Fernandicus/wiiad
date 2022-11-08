import { LoginQueries } from "@/src/domain/LoginQueries";
import { MongoDB } from "@/src/infrastructure/MongoDB";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { LogInController } from "@/src/controllers/LogInController";
import { IGenericUserPrimitives } from "@/src/domain/IGenericUser";
import { AdPropsPrimitives } from "@/src/modules/ad/domain/Ad";
import {
  IWatchCampaignData,
  WatchCampaignsController,
} from "@/src/controllers/WatchCampaignsController";
import AdView from "../../components/ui/watch-ad/AdView";
import { RoleType } from "@/src/domain/Role";
import { ICampaignPrimitives } from "@/src/modules/campaign/domain/Campaign";
import { userSession } from "@/src/use-case/container";
import { UserProfile } from "../../components/ui/profile/user/UserProfile";
import { AdvertiserHeader } from "../../components/ui/profile/advertiser/AdvertiserHeader";
import { useEffect, useRef, useState } from "react";
import { adFinderHandler } from "@/src/modules/ad/ad-container";
import { ApiRoutes } from "@/src/utils/ApiRoutes";
import {
  NotificationData,
  Notifications,
  RefNotifications,
} from "../../components/ui/notifications/Notifications";
import { IUserPrimitives } from "@/src/modules/user/domain/User";
import { Logout } from "../../components/ui/login/Logout";
import { findCampaignHandler } from "@/src/modules/campaign/container";
import CampaignsPage from "./campaigns";

export interface IUserNamePage {
  user: IGenericUserPrimitives;
  campaign: ICampaignPrimitives | ICampaignPrimitives[] | null;
  ad: AdPropsPrimitives | AdPropsPrimitives[] | null;
  referrer: IGenericUserPrimitives | null;
}

export default function Profile({
  user,
  ad,
  campaign,
  referrer,
}: IUserNamePage) {
  const notificationHandler = useRef<RefNotifications>({
    showNotification: (data: NotificationData) => {},
  });

  if (user.role === RoleType.USER && ad && campaign) {
    return (
      <AdView
        campaign={campaign as ICampaignPrimitives}
        ad={ad as AdPropsPrimitives}
        referrer={referrer!}
      />
    );
  }

  if (user.role === RoleType.USER) {
    return <UserProfile user={user} />;
  }

  const ads = ad as AdPropsPrimitives[];
  const campaigns = campaign as ICampaignPrimitives[];

  return (
    <div>
      <Notifications ref={notificationHandler} />
      <Logout />
      <main className="h-screen bg-slate-100 p-10 w-full ">
        <AdvertiserHeader
          user={user}
          totalAds={ads.length}
          totalCampaigns={campaigns.length}
        />
      </main>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { query } = context;

  const queryParams = new LoginQueries(query);

  try {
    if (!queryParams.email || !queryParams.token) {
      const session = userSession.getFromServer(context);
      if (session && session.name == queryParams.userName) {
        if (session.role !== RoleType.USER) {
          const { ads, campaigns } = await MongoDB.connectAndDisconnect<{
            ads: AdPropsPrimitives[];
            campaigns: ICampaignPrimitives[];
          }>(async () => {
            const campaigns = await findCampaignHandler.byAdvertiserId(
              session.id
            );
            const ads = await adFinderHandler.findAll(session.id);
            return { campaigns, ads };
          });

          return {
            props: {
              user: session,
              ad: ads,
              campaign: campaigns,
            } as IUserNamePage,
          };
        }
        return {
          props: { user: session } as IUserNamePage,
        };
      }
      const { ad, activeCampaign, referrer } =
        await MongoDB.connectAndDisconnect<IWatchCampaignData>(async () => {
          return await WatchCampaignsController.forInfluencer(
            queryParams.userName,
            session
          );
        });

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
        } as IUserNamePage,
      };
    }

    const {user, ads, campaigns} = await MongoDB.connectAndDisconnect<{
      user: IGenericUserPrimitives;
      campaigns?: ICampaignPrimitives[];
      ads?: AdPropsPrimitives[];
    }>(async () => {
      const user = await LogInController.initSession(
        {
          email: queryParams.email!,
          token: queryParams.token!,
          userName: queryParams.userName,
        },
        context
      );
      if (user.role === RoleType.USER) return { user };
      const campaigns = await findCampaignHandler.byAdvertiserId(user.id);
      const ads = await adFinderHandler.findAll(user.id);
      return { user, campaigns, ads };
    });

    return {
      props: {
        user,
        ad: ads,
        campaign: campaigns
      } as IUserNamePage,
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
