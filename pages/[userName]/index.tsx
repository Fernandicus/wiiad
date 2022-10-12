import { ValidateLoginQueries } from "@/src/domain/ValidateLoginQueries";
import { getCookie, setCookie } from "cookies-next";
import { MongoDB } from "@/src/infrastructure/MongoDB";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { AdvertiserPropsPrimitives } from "@/src/advertiser/domain/Advertiser";
import {
  IAdvertiserLogIn,
  LogInController,
} from "@/src/controllers/LogInController";
import { jwtHandler } from "@/src/mailing/send-email-verification/email-verification-container";
import { ErrorLogIn } from "@/src/domain/ErrorLogIn";

export interface ILogInSSR {
  props: {
    jwt: string;
    user: AdvertiserPropsPrimitives;
  };
}

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
  const { query, req, res } = context;

  try {
    const queryParams = new ValidateLoginQueries(query);
    if (!queryParams.email || !queryParams.token) {
      //TODO: CHECK IF THERE IS A SESSION COOKIE
      const authToken = getCookie("authToken", { req, res, httpOnly: true });
      if (!authToken) throw new ErrorLogIn("No authToken provided");
      const tokenData = jwtHandler.decodeToken<AdvertiserPropsPrimitives>(
        authToken.toString()
      );
      return {
        props: {
          jwt: authToken,
          user: {
            email: tokenData.email,
            id: tokenData.id,
            name: tokenData.name,
            rol: tokenData.rol,
          } as AdvertiserPropsPrimitives,
        },
      };
    }

    const initSession = async () =>
      await LogInController.initSession({
        email: queryParams.email!,
        token: queryParams.token!,
        userName: queryParams.userName,
      });

    const resp = await MongoDB.connectAndDisconnect<IAdvertiserLogIn | null>(
      initSession
    );

    //setCookie("authToken", resp?.jwt, { req, res, httpOnly: true });

  

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
