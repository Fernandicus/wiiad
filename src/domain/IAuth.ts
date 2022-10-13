import { IUser } from "./IUser";
import { IncomingMessage, ServerResponse } from "http";

export interface IReqAndRes {
  req: IncomingMessage;
  res: ServerResponse;
}

export interface IAuth {
  getServerCookieJWT<T extends IReqAndRes>(params: T): string | null;
  setServerCookieJWT<T extends IReqAndRes, U extends IUser>(params: T, payload: U): void;
}
