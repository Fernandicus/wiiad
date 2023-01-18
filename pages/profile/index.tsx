import { LoginQueries } from "@/src/common/domain/LoginQueries";
import { MongoDB } from "@/src/common/infrastructure/MongoDB";
import { GetServerSideProps } from "next";
import { RoleType } from "@/src/common/domain/Role";
import { userSession } from "@/src/modules/session/infrastructure/session-container";
import { IReqAndRes } from "@/src/modules/session/domain/interfaces/IAuthCookies";
import { ProfileDataController } from "@/src/common/infrastructure/controllers/ProfileDataController";
import { SignInController } from "@/src/common/infrastructure/controllers/LogInController";
import {
  IProfilePageParams,
  UserProfilePage,
} from "@/components/ui/pages/profile/UserProfilePage";

export default function Profile({ user, ads, campaigns }: IProfilePageParams) {
  return <UserProfilePage user={user} ads={ads} campaigns={campaigns} />;
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { query } = context;
  const loginQueries = new LoginQueries(query);

  try {
    const userData = await MongoDB.connectAndDisconnect(async () => {
      if (!loginQueries.authToken) {
        return await visitProfile(context);
      }
      const singInController = SignInController.verifyJWT({
        authToken: loginQueries.authToken,
        context,
      });
      const userData = await singInController.signIn(loginQueries);
      return getSSRData(userData);
    });
    return userData;
  } catch (err) {
    await MongoDB.disconnect();
    return {
      props: {},
      redirect: { destination: "/", permanent: false },
    };
  }
};

async function visitProfile(
  context: IReqAndRes
): Promise<{ props: IProfilePageParams }> {
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
      } as IProfilePageParams,
    };
  }

  return {
    props: {
      user: session,
    } as IProfilePageParams,
  };
}

function getSSRData(data: IProfilePageParams) {
  return {
    props: {
      user: data.user,
      ads: data.ads,
      campaigns: data.campaigns,
    } as IProfilePageParams,
    redirect: {
      destination: "/profile",
      permanent: false,
    },
  };
}
