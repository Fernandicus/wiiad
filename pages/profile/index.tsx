import { LoginQueries } from "@/src/domain/LoginQueries";
import { MongoDB } from "@/src/common/infrastructure/MongoDB";
import { GetServerSideProps } from "next";
import { AuthController } from "@/src/controllers/AuthController";
import { IGenericUserPrimitives } from "@/src/domain/GenericUser";
import { AdPropsPrimitives } from "@/src/modules/ad/domain/Ad";
import AdView from "../../components/ui/watch-ad/AdView";
import { RoleType } from "@/src/domain/Role";
import { ICampaignPrimitives } from "@/src/modules/campaign/domain/Campaign";
import { userSession } from "@/src/modules/session/infrastructure/session-container";
import { UserProfile } from "../../components/ui/profile/user/UserProfile";
import { AdvertiserHeader } from "../../components/ui/profile/advertiser/AdvertiserHeader";
import { useRef } from "react";
import {
  NotificationData,
  Notifications,
  RefNotifications,
} from "../../components/ui/notifications/Notifications";
import { Logout } from "../../components/ui/login/Logout";
import { AdvertiserDataController } from "@/src/modules/advertiser/controller/AdvertiserDataController";
import { IReqAndRes } from "@/src/modules/session/domain/interfaces/IAuthCookies";

interface IAdsAndCampaigns {
  campaigns: ICampaignPrimitives[] | null;
  ads: AdPropsPrimitives[] | null;
}

interface ILoginData {
  user: IGenericUserPrimitives;
  campaigns: ICampaignPrimitives[];
  ads: AdPropsPrimitives[];
}

export interface IUserProfilePage {
  user: IGenericUserPrimitives;
  campaigns: ICampaignPrimitives[];
  ads: AdPropsPrimitives[];
}

export default function Profile({ user, ads, campaigns }: IUserProfilePage) {
  const notificationHandler = useRef<RefNotifications>({
    showNotification: (data: NotificationData) => {},
  });

  if (user.role === RoleType.USER) {
    return <UserProfile user={user} />;
  }

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

  console.log("QUERY");
  console.log(query);

  const loginQueries = new LoginQueries(query);

  try {
    if (!loginQueries.authToken || !loginQueries.userName) {
      const session = userSession.getFromServer(context);

      if (!session) throw new Error("No session provided");

      const { ads, campaigns } = await initSession(session);

      return {
        props: {
          user: session,
          ads,
          campaigns,
        } as IUserProfilePage,
      };
    }

    const data = await logInOrSignUp({
      loginQueries,
      context,
    });

    return {
      props: {
        user: data.user,
        ads: data.ads,
        campaigns: data.campaigns,
      } as IUserProfilePage,
      redirect: {
        destination: "/profile",
        permanent: false,
      },
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

async function initSession(session: IGenericUserPrimitives) {
  const { ads, campaigns } =
    await MongoDB.connectAndDisconnect<IAdsAndCampaigns>(
      async () => await AdvertiserDataController.getAll(session.id)
    );

  return {
    ads,
    campaigns,
  };
}

async function logInOrSignUp(params: {
  loginQueries: LoginQueries;
  context: IReqAndRes;
}): Promise<ILoginData> {
  const { loginQueries, context } = params;

  const data = await MongoDB.connectAndDisconnect<ILoginData>(async () => {
    if (loginQueries.isLogin()) {
      const loginData = await getLogInData(loginQueries, context);
      return loginData;
    }

    if (loginQueries.isSignUp()) {
      const signUpData = await getSingUpData(loginQueries, context);
      return signUpData;
    }

    throw new Error("No 'log' query param provided");
  });

  return data;
}

async function getLogInData(
  loginQueries: LoginQueries,
  context: IReqAndRes
): Promise<ILoginData> {
  const user = await AuthController.logIn({ ...loginQueries }, context);
  const { ads, campaigns } = await AdvertiserDataController.getAll(user.id);
  return { user, ads, campaigns };
}

async function getSingUpData(
  loginQueries: LoginQueries,
  context: IReqAndRes
): Promise<ILoginData> {
  const user = await AuthController.signUp({ ...loginQueries }, context);
  const { ads, campaigns } = await AdvertiserDataController.getAll(user.id);
  return { user, campaigns, ads };
}
