import { getCookie, setCookie } from "cookies-next";
import { ErrorAuthentifying } from "../domain/ErrorAuthentifying";
import { manageJWT } from "../mailing/send-email-verification/email-verification-container";
import { IncomingMessage, ServerResponse } from "http";
import { IUser } from "../domain/IUser";
import { IAuth, IReqAndRes } from "../domain/IAuth";

enum Cookie {
  AUTH_TOKEN = "authToken",
}

export class Auth implements IAuth {
  constructor() {}

  setServerCookieJWT(params: IReqAndRes, payload: IUser): void {
    const { req, res } = params;
    const token = manageJWT.createToken(payload);
    setCookie(Cookie.AUTH_TOKEN, token, { req, res, httpOnly: true });
  }

  getServerCookieJWT(params: IReqAndRes): string | null {
    const { req, res } = params;
    const authToken = getCookie(Cookie.AUTH_TOKEN, {
      req,
      res,
      httpOnly: true,
    });

    if (!authToken) return null;
    return authToken.toString();
  }
}
