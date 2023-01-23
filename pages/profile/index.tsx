import { LoginQueries } from "@/src/common/domain/LoginQueries";
import { MongoDB } from "@/src/common/infrastructure/MongoDB";
import { GetServerSideProps } from "next";
import { userSession } from "@/src/modules/session/infrastructure/session-container";
import { IReqAndRes } from "@/src/modules/session/domain/interfaces/IAuthCookies";
import { SignInController } from "@/src/common/infrastructure/controllers/LogInController";
import {
  IProfilePageParams,
  UserProfilePage,
} from "@/components/ui/pages/profile/UserProfilePage";
import { RoleType } from "@/src/common/domain/Role";
import { useEffect } from "react";
import { useAdvertiser } from "@/components/hooks/advertiser/useAdvertiser";

export default function Profile({ user }: IProfilePageParams) {
  const advertiser = useAdvertiser();

  useEffect(() => {
    if (user.role !== RoleType.USER && advertiser.status === "non-init")
      advertiser.initStore();
  }, []);

  return <UserProfilePage user={user} />;
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { query } = context;
  const loginQueries = new LoginQueries(query);

  try {
    return await serverSideResponse({ context, loginQueries });
  } catch (err) {
    await MongoDB.disconnect();
    return {
      props: {},
      redirect: { destination: "/", permanent: false },
    };
  }
};

async function serverSideResponse(params: {
  loginQueries: LoginQueries;
  context: IReqAndRes;
}) {
  const { context, loginQueries } = params;
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
}

async function visitProfile(
  context: IReqAndRes
): Promise<{ props: IProfilePageParams }> {
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
