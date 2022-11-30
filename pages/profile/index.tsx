import { LoginQueries } from "@/src/common/domain/LoginQueries";
import { MongoDB } from "@/src/common/infrastructure/MongoDB";
import { GetServerSideProps } from "next";
import { AuthController } from "@/src/common/infrastructure/controllers/AuthController";
import { AdPropsPrimitives } from "@/src/modules/ad/domain/Ad";
import AdView from "../../components/ui/watch-ad/AdView";
import { RoleType } from "@/src/common/domain/Role";
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
import { IReqAndRes } from "@/src/modules/session/domain/interfaces/IAuthCookies";
import { IUserPrimitives } from "@/src/modules/users/user/domain/User";
import { ProfileDataController } from "@/src/common/infrastructure/controllers/ProfileDataController";

interface IAdsAndCampaigns {
  campaigns: ICampaignPrimitives[] | null;
  ads: AdPropsPrimitives[] | null;
}

interface ILoginData {
  user: IUserPrimitives;
  campaigns: ICampaignPrimitives[];
  ads: AdPropsPrimitives[];
}

export interface IUserProfilePage {
  user: IUserPrimitives;
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

async function initSession(session: IUserPrimitives) {
  const { ads, campaigns } =
    await MongoDB.connectAndDisconnect<IAdsAndCampaigns>(
      async () => await ProfileDataController.getAdvertiserData(session.id)
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
  const { ads, campaigns } = await ProfileDataController.getAdvertiserData(user.id)
  return { user, ads, campaigns };
}

async function getSingUpData(
  loginQueries: LoginQueries,
  context: IReqAndRes
): Promise<ILoginData> {
  const user = await AuthController.signUp({ ...loginQueries }, context);
  const { ads, campaigns } = await ProfileDataController.getAdvertiserData(user.id)
  return { user, campaigns, ads };
}
