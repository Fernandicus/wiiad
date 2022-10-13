import { getCookie, setCookie } from "cookies-next";
import { IUser } from "../domain/IUser";
import { IAuth, IReqAndRes } from "../domain/IAuth";

enum Cookie {
  AUTH_TOKEN = "authToken",
}

export class Auth implements IAuth {
  constructor() {}

  setServerCookieJWT(params: IReqAndRes, jwt: string): void {
    const { req, res } = params;
    setCookie(Cookie.AUTH_TOKEN, jwt, { req, res, httpOnly: true });
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
