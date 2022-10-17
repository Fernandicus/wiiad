import { IncomingMessage, ServerResponse } from "http";

export interface IReqAndRes {
  req: IncomingMessage;
  res?: ServerResponse;
}

export interface IAuthCookies {
  getServerCookieJWT<T extends IReqAndRes>(params: T): string | null;
  setServerCookieJWT<T extends IReqAndRes>(params: T, jwt: string): void;
  removeServerCookieJWT<T extends IReqAndRes>(params: T): void;
}
