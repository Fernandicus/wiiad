import { getCookie, setCookie } from "cookies-next";
import { ErrorAuthentifying } from "../domain/ErrorAuthentifying";
import { manageJWT } from "../mailing/send-email-verification/email-verification-container";
import { IncomingMessage, ServerResponse } from "http";
import { IUser } from "../domain/IUser";

interface IReqAndRes {
  req: IncomingMessage;
  res: ServerResponse;
}

export class ServerAuth {
  static getToken(params: IReqAndRes): IUser {
    const { req, res } = params;
    const authToken = getCookie("authToken", { req, res, httpOnly: true });

    if (!authToken) throw new ErrorAuthentifying("No authToken provided");

    return manageJWT.verifyToken<IUser>(authToken.toString());
  }

  static setToken<T extends IUser>(
    payload: T,
    params: IReqAndRes
  ): void {
    const { req, res } = params;
    const token = manageJWT.createToken(payload);
    setCookie("authToken", token, { req, res, httpOnly: true });
  }
}
