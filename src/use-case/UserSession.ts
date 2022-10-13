import { IAuth, IReqAndRes } from "../domain/IAuth";
import { IUser } from "../domain/IUser";
import { IJsonWebTokenRepo } from "../mailing/send-email-verification/domain/IJsonWebTokenRepo";

export class UserSession {
  constructor(private auth: IAuth, private jwtRepo: IJsonWebTokenRepo) {}

  getFromServer(context: IReqAndRes): IUser | null {
    const token = this.auth.getServerCookieJWT(context);
    if (!token) return null;
    const session = this.jwtRepo.verify<IUser>(token);
    if (!session) return null;
    return session;
  }

  setFromServer(context: IReqAndRes, payload: IUser): void {
    this.auth.setServerCookieJWT(context, payload);
  }
}
