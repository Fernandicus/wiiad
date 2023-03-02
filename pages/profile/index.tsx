import { LoginQueries } from "@/src/common/domain/LoginQueries";
import { MongoDB } from "@/src/common/infrastructure/MongoDB";
import { GetServerSideProps } from "next";
import { userSession } from "@/src/modules/session/infrastructure/session-container";
import { IReqAndRes } from "@/src/modules/session/domain/interfaces/IAuthCookies";
import { SignInController } from "@/src/common/infrastructure/controllers/LogInController";
import { ProfilePage } from "@/components/ui/pages/profile/ProfilePage";
import { useEffect } from "react";
import { useAdvertiser } from "@/components/hooks/advertiser/useAdvertiser";
import { IUserPrimitives } from "@/src/modules/users/user/domain/User";
import { HandleRolesHandler } from "@/src/modules/users/user/handler/HandleRolesHandler";
import { useUser } from "@/components/hooks/user/useUser";
import { useAccount } from "@/components/hooks/useAccount";

export interface IProfilePageParams {
  user: IUserPrimitives;
}

export default function Profile({ user }: IProfilePageParams) {
  const account = useAccount();

  useEffect(() => {
    account.initStore(user);
  }, []);

  return <ProfilePage user={user} />;
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { query } = context;
  const loginQueries = new LoginQueries(query);

  try {
    if (!loginQueries.authToken) return visitProfile(context);

    const data = await singInOrUpdate({ context, loginQueries });

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

async function singInOrUpdate(params: {
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

    if (loginQueries.isSignUp()) return await singInController.signUp();

    if (loginQueries.isUpdateEmail())
      return await singInController.updateEmail();
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
