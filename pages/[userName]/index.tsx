import { LogInQueryParams } from "@/src/domain/LogInQueryParams";
import { MongoDB } from "@/src/infrastructure/MongoDB";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { UniqId } from "@/src/utils/UniqId";
import {
  jwtHandler,
  validateEmailHandler,
} from "@/src/mailing/send-email-verification/email-verification-container";
import {
  createAdvertiserHandler,
  findAdvertiserHandler,
} from "@/src/advertiser/advertiser-container";
import { AdvertiserPropsPrimitives } from "@/src/advertiser/domain/Advertiser";
import { ErrorLogIn } from "@/src/domain/ErrorLogIn";
import { RolType } from "@/src/domain/Rol";
import {
  IAdvertiserLogIn,
  LogInController,
} from "@/src/controllers/LogInController";

export interface ILogInSSR {
  props: {
    jwt: string;
    user: AdvertiserPropsPrimitives;
  };
}

export default function profilePage(
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
  const { query, params } = context;

  try {
    const queryParams = new LogInQueryParams(query, params);
    const logInPromise = async () => await LogInController.verify(queryParams);
    const resp = await MongoDB.connectAndDisconnect<IAdvertiserLogIn | null>(
      logInPromise
    );

    return {
      props: {
        jwt: resp?.jwt,
        user: { ...resp?.advertiser },
      },
    } as ILogInSSR;
  } catch (err) {
    return {
      props: {},
      redirect: { destination: "/", permanent: false },
    };
  }
};
