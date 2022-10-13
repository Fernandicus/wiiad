import { ValidateLoginQueries } from "@/src/domain/ValidateLoginQueries";
import { MongoDB } from "@/src/infrastructure/MongoDB";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { AdvertiserPropsPrimitives } from "@/src/modules/advertiser/domain/Advertiser";
import {
  LogInController,
} from "@/src/controllers/LogInController";
import { IUser } from "@/src/domain/IUser";
import { ErrorLogIn } from "@/src/domain/ErrorLogIn";
import { userSession } from "@/src/use-case/container";
import { useEffect } from "react";

export default function Profile(
  props: InferGetServerSidePropsType<typeof getServerSideProps>
) {
  const user: AdvertiserPropsPrimitives = props.user;

  return (
    <div>
      <h1>{user.id}</h1>
      <h1>{user.email}</h1>
      <h1>{user.name}</h1>
      <h1>{user.rol}</h1>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { query } = context;
  const queryParams = new ValidateLoginQueries(query);
  try {
    if (!queryParams.email || !queryParams.token) {
      const session = userSession.getFromServer(context);
      if (!session) throw new ErrorLogIn("No existing session");
      return {
        props: {
          user: { ...session } as IUser,
        },
      };
    }

    const user = await MongoDB.connectAndDisconnect<IUser | null>(
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
        user: { ...user } as IUser,
      },
    };
  } catch (err) {
    return {
      props: {},
      redirect: { destination: "/", permanent: false },
    };
  }
};
