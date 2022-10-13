import { getCookie, setCookie } from "cookies-next";
import { IUser } from "../domain/IUser";
import { IAuth, IReqAndRes } from "../domain/IAuth";
import { EmailVerificationConstants } from "../modules/mailing/send-email-verification/EmailVerificationConstants";

enum Cookie {
  AUTH_TOKEN = "authToken",
}

export class Auth implements IAuth {
  constructor() {}

  setServerCookieJWT(params: IReqAndRes, jwt: string): void {
    const { req, res } = params;
    setCookie(Cookie.AUTH_TOKEN, jwt, {
      req,
      res,
      httpOnly: true,
      expires: new Date(Date.UTC(2032, 11, 1)),
    });
  }

  getServerCookieJWT(params: IReqAndRes): string | null {
    const { req, res } = params;
    const authToken = getCookie(Cookie.AUTH_TOKEN, {
      req,
      res,
      domain:'http://localhost:3000',
      httpOnly: true,
    });

    if (!authToken) return null;
    return authToken.toString();
  }
}
