import { LoginQueries } from "@/src/common/domain/LoginQueries";
import { MongoDB } from "@/src/common/infrastructure/MongoDB";
import { GetServerSideProps } from "next";
import { userSession } from "@/src/modules/session/infrastructure/session-container";
import { IReqAndRes } from "@/src/modules/session/domain/interfaces/IAuthCookies";
import { SignInController } from "@/src/common/infrastructure/controllers/LogInController";
import { UserProfilePage } from "@/components/ui/pages/profile/UserProfilePage";
import { RoleType } from "@/src/common/domain/Role";
import { useEffect } from "react";
import { useAdvertiser } from "@/components/hooks/advertiser/useAdvertiser";
import { IUserPrimitives } from "@/src/modules/users/user/domain/User";

export interface IProfilePageParams {
  user: IUserPrimitives;
}

export default function Profile({ user }: IProfilePageParams) {
  const advertiser = useAdvertiser();

  useEffect(() => {
    advertiser.initStore(user);
  }, []);

  return <UserProfilePage user={user} />;
}

//! BUG
//TODO: [BUG] When log in with existing advertiser it creates a new user again

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { query } = context;
  const loginQueries = new LoginQueries(query);

  try {
    if (!loginQueries.authToken) return visitProfile(context);

    const data = await loginOrSignUp({ context, loginQueries });
    
    if (!data) throw new Error("No data provided");
    return getSSRData(data);

  } catch (err) {
    await MongoDB.disconnect();
    return {
      props: {},
      redirect: { destination: "/", permanent: false },
    };
  }
};

async function loginOrSignUp(params: {
  loginQueries: LoginQueries;
  context: IReqAndRes;
}) {
  const { context, loginQueries } = params;
  const userData = await MongoDB.connectAndDisconnect(async () => {
    const singInController = SignInController.verifyJWT({
      authToken: loginQueries.authToken,
      context,
    });

    if (loginQueries.isLogin()) return await singInController.logIn();

    if (loginQueries.isSignUp())
      return await singInController.signIn(loginQueries);
  });

  return userData;
}

function visitProfile(context: IReqAndRes): { props: IProfilePageParams } {
  const session = userSession.getFromServer(context);
  if (!session) throw new Error("No session provided");
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
    } as IProfilePageParams,
    redirect: {
      destination: "/profile",
      permanent: false,
    },
  };
}
