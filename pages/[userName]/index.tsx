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
import CreateAdForm from "../../components/profile/CreateAdForm";
import HeaderData from "../../components/profile/HeaderData";
import TotalAds from "../../components/profile/TotalAds";
import AdView from "../../components/watch-ad/AdView";
import { RolType } from "@/src/domain/Rol";
import { ICampaignPrimitives } from "@/src/modules/campaign/domain/Campaign";
import { userSession } from "@/src/use-case/container";
import { findUserHandler } from "@/src/modules/user/container";
import { ErrorWatchingCampaign } from "@/src/domain/ErrorWatchingCampaign";

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
    return (
      <div>
        <h1>HELLO USER</h1>
        <h3>{user.name}</h3>
        <h2>{user.email}</h2>
      </div>
    );
  }

  return (
    <main>
      {user.rol != RolType.USER && (
        <div>
          <a href={`${user.name}/ads`}>Create Campaign</a>
        </div>
      )}
      <HeaderData user={user} />
      <CreateAdForm user={user} />
      <TotalAds />
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
          return await WatchCampaignsController.forInfluencer(queryParams.userName);
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
