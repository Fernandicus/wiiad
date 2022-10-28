import { LoginQueries } from "@/src/domain/LoginQueries";
import { MongoDB } from "@/src/infrastructure/MongoDB";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { LogInController } from "@/src/controllers/LogInController";
import { IGenericUserPrimitives } from "@/src/domain/IUser";
import { AdPropsPrimitives } from "@/src/modules/ad/domain/Ad";
import {
  IWatchCampaignData,
  WatchCampaignsController,
} from "@/src/controllers/WatchCampaignsController";
import AdView from "../../components/ui/watch-ad/AdView";
import { RolType } from "@/src/domain/Rol";
import { ICampaignPrimitives } from "@/src/modules/campaign/domain/Campaign";
import { userSession } from "@/src/use-case/container";
import { UserProfile } from "../../components/ui/profile/user/UserProfile";
import { AdvertiserHeader } from "../../components/ui/profile/advertiser/AdvertiserHeader";
import { useEffect, useState } from "react";
import { adFinderHandler } from "@/src/modules/ad/ad-container";
import { Routes } from "@/src/utils/routes";

export interface IUserNamePage {
  user: IGenericUserPrimitives;
  campaign: ICampaignPrimitives | null;
  ad: AdPropsPrimitives | null;
}

export default function Profile({ user, ad, campaign }: IUserNamePage) {
  if (ad && campaign) {
    return <AdView campaign={campaign} ad={ad} />;
  }

  if (user.rol === RolType.USER) {
    return <UserProfile user={user} />;
  }

  const [ads, setAds] = useState<number>(0);

  const totalAds = async () => {
    fetch(Routes.allAds)
      .then(async (response) => {
        if (response.status === 200) {
          const respJSON = await response.json();
          setAds(respJSON.ads.length);
        } else {
          setAds(0);
        }
      })
      .catch((error) => {
        setAds(0);
      });
  };

  useEffect(() => {
    totalAds();
  }, []);

  return (
    <main className="h-screen bg-slate-100 p-10 w-full ">
      <AdvertiserHeader user={user} totalAds={ads} totalCampaigns={0} />
    </main>
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

      const { ad, activeCampaign } =
        await MongoDB.connectAndDisconnect<IWatchCampaignData>(async () => {
          return await WatchCampaignsController.forInfluencer(
            queryParams.userName
          );
        });

      return {
        props: { user: session, campaign: activeCampaign, ad } as IUserNamePage,
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
