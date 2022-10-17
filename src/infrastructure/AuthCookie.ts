import { deleteCookie, getCookie, setCookie } from "cookies-next";
import { IAuthCookies, IReqAndRes } from "../domain/IAuthCookies";

enum Cookie {
  AUTH_TOKEN = "authToken",
}

export class AuthCookie implements IAuthCookies {
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
      res
    });

    if (!authToken) return null;
    return authToken.toString();
  }

  removeServerCookieJWT(params: IReqAndRes): void {
    const { req, res } = params;
    deleteCookie(Cookie.AUTH_TOKEN, { req, res });
  }
}
