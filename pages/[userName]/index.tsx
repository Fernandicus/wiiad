import { LoginQueries } from "@/src/domain/LoginQueries";
import { MongoDB } from "@/src/infrastructure/MongoDB";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { LogInController } from "@/src/controllers/LogInController";
import { IGenericUserPrimitives } from "@/src/domain/IUser";
import { AdPropsPrimitives } from "@/src/modules/ad/domain/Ad";
import {
  IWatchAdData,
  WatchCampaignsController,
} from "@/src/controllers/WatchCampaignsController";
import CreateAdForm from "../../components/profile/CreateAdForm";
import HeaderData from "../../components/profile/HeaderData";
import TotalAds from "../../components/profile/TotalAds";
import AdView from "../../components/watch-ad/AdView";
import { RolType } from "@/src/domain/Rol";
import { ICampaignPrimitives } from "@/src/modules/campaign/domain/Campaign";

export default function Profile(
  props: InferGetServerSidePropsType<typeof getServerSideProps>
) {
  const user: IGenericUserPrimitives = props.user;
  const activeCampaigns: ICampaignPrimitives[] = props.activeCampaigns;

  if (activeCampaigns && activeCampaigns.length > 0) {
    return <AdView campaigns={activeCampaigns} />;
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
      const data = await MongoDB.connectAndDisconnect<IWatchAdData>(
        async () => {
          return await WatchCampaignsController.verify(context, queryParams);
        }
      );
      return {
        props: data,
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
        user: { ...user } as IGenericUserPrimitives,
      },
    };
  } catch (err) {
    console.error(err);
    return {
      props: {},
      redirect: { destination: "/", permanent: false },
    };
  }
};
