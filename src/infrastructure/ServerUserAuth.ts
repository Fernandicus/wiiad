import { getCookie, setCookie } from "cookies-next";
import { ErrorAuthentifying } from "../domain/ErrorAuthentifying";
import { manageJWT } from "../mailing/send-email-verification/email-verification-container";
import { IncomingMessage, ServerResponse } from "http";
import { IUser } from "../domain/IUser";

interface IReqAndRes {
  req: IncomingMessage;
  res: ServerResponse;
}

enum Cookie {
  AUTH_TOKEN = "authToken",
}

export class ServerUserAuth {
  static getToken(params: IReqAndRes): IUser {
    const { req, res } = params;
    const authToken = getCookie(Cookie.AUTH_TOKEN, {
      req,
      res,
      httpOnly: true,
    });

    if (!authToken)
      throw new ErrorAuthentifying(`No ${Cookie.AUTH_TOKEN} provided`);

    return manageJWT.verifyToken<IUser>(authToken.toString());
  }

  static setToken<T extends IUser>(payload: T, params: IReqAndRes): void {
    const { req, res } = params;
    const token = manageJWT.createToken(payload);
    setCookie(Cookie.AUTH_TOKEN, token, { req, res, httpOnly: true });
  }
}
