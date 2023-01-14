import { LoginQueries } from "@/src/common/domain/LoginQueries";
import { MongoDB } from "@/src/common/infrastructure/MongoDB";
import { GetServerSideProps } from "next";
import { RoleType } from "@/src/common/domain/Role";
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
import { LogInController } from "@/src/common/infrastructure/controllers/LogInController";
import { IUserProfilePage } from "@/src/common/domain/interfaces/IUserProfilePage";

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
          totalAds={ads!.length}
          totalCampaigns={campaigns!.length}
        />
      </main>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { query } = context;
  const { authToken, isLogin, isSignUp, log } = new LoginQueries(query);

  try {
    if (!authToken) {
      return await visitProfile(context);
    }
    const loginController = LogInController.verifyJWT({
      authToken,
      context,
    });
    return await loginOrSingup({ isLogin, isSignUp, loginController });
  } catch (err) {
    console.error(err);
    await MongoDB.disconnect();
    return {
      props: {},
      redirect: { destination: "/", permanent: false },
    };
  }
};

async function visitProfile(
  context: IReqAndRes
): Promise<{ props: IUserProfilePage }> {
  const session = userSession.getFromServer(context);
  if (!session) throw new Error("No session provided");

  if (session.role !== RoleType.USER) {
    const profileController = new ProfileDataController();
    const { ads, campaigns } = await profileController.getAdvertiserData(
      session.id
    );
    return {
      props: {
        user: session,
        ads,
        campaigns,
      } as IUserProfilePage,
    };
  }

  return {
    props: {
      user: session,
      ads: null,
      campaigns: null,
    } as IUserProfilePage,
  };
}

async function loginOrSingup(params: {
  isLogin(): boolean;
  isSignUp(): boolean;
  loginController: LogInController;
}) {
  const { isLogin, isSignUp, loginController } = params;
  let data: IUserProfilePage;

  if (isLogin()) {
    data = await loginController.logIn();
    return getSSRData(data);
  }

  if (isSignUp()) {
    data = await loginController.signUp();
    return getSSRData(data);
  }

  throw new Error(`Something went wrong Singing Up or Logging In.`);
}

function getSSRData(data: IUserProfilePage) {
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
}
