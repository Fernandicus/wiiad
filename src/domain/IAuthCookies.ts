import { IncomingMessage, ServerResponse } from "http";

export interface IReqAndRes {
  req: IncomingMessage;
  res?: ServerResponse;
}

export interface IAuthCookies {
  getServerJWT<T extends IReqAndRes>(params: T): string | null;
  setServerJWT<T extends IReqAndRes>(params: T, jwt: string): void;
  removeServerJWT<T extends IReqAndRes>(params: T): void;
}
