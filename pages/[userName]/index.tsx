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

export interface IUserNamePage {
  user: IGenericUserPrimitives;
  campaign: ICampaignPrimitives | null;
  ad: AdPropsPrimitives | null;
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

  if (ad && campaign) {
    return <AdView campaign={campaign} ad={ad} referrer={referrer!} />;
  }

  if (user.role === RoleType.USER) {
    return <UserProfile user={user} />;
  }

  const [ads, setAds] = useState<number>(0);
  const [campaigns, setCampaigns] = useState<number>(0);

  const totalAds = async () => {
    console.log("ADS ");
    await fetch(ApiRoutes.allAds)
      .then(async (response) => {
        console.log("ADS ", response);
        if (response.status === 200) {
          const respJSON = (await response.json()) as {
            ads: AdPropsPrimitives[];
          };
          setAds(respJSON.ads.length);
        } else {
          console.log("ADS ", response);
          setAds(0);
        }
      })
      .catch((error) => {
        if (error.message === "Failed to fetch") {
          notificationHandler.current.showNotification({
            message: "Desactiva el bloqueador de anuncios",
            status: 400,
          });
        }
        setAds(0);
      });
  };

  const totalCampaigns = async () => {
    console.log("CAMPAIGNS ");
    await fetch(ApiRoutes.advertiserCampaigns)
      .then(async (response) => {
        console.log("CAMPAINGS ", response);
        if (response.status === 200) {
          const respJSON = (await response.json()) as {
            campaigns: ICampaignPrimitives[];
          };
          setCampaigns(respJSON.campaigns.length);
        } else {
          setCampaigns(0);
        }
      })
      .catch((error) => {
        if (error.message === "Failed to fetch") {
          notificationHandler.current.showNotification({
            message: "Desactiva el bloqueador de anuncios",
            status: 400,
          });
        }
        setCampaigns(0);
      });
  };

  const findAdsAndCampaigns = async () => {
    await totalAds();
    await totalCampaigns();
  };

  useEffect(() => {
    findAdsAndCampaigns();
  }, []);

  return (
    <div>
      <Notifications ref={notificationHandler} />
      <main className="h-screen bg-slate-100 p-10 w-full ">
        <AdvertiserHeader
          user={user}
          totalAds={ads}
          totalCampaigns={campaigns}
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
      if (session && session.name == queryParams.userName)
        return {
          props: { user: session } as IUserNamePage,
        };

      const { ad, activeCampaign, referrer } =
        await MongoDB.connectAndDisconnect<IWatchCampaignData>(async () => {
          return await WatchCampaignsController.forInfluencer(
            queryParams.userName
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

    const user =
      await MongoDB.connectAndDisconnect<IGenericUserPrimitives | null>(
        async () =>
          await LogInController.initSession(
            {
              email: queryParams.email!,
              token: queryParams.token!,
              userName: queryParams.userName,
            },
            context
          )
      );

    return {
      props: {
        user: { ...user },
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
