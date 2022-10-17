import { IAuthCookies, IReqAndRes } from "../domain/IAuthCookies";
import { IUser } from "../domain/IUser";
import { IJsonWebTokenRepo } from "../domain/IJsonWebTokenRepo";

export class UserSession {
  constructor(private auth: IAuthCookies, private jwtRepo: IJsonWebTokenRepo) {}

  getFromServer(context: IReqAndRes): IUser | null {
    const token = this.auth.getServerCookieJWT(context);
    if (!token) return null;
    const session = this.jwtRepo.verify<IUser>(token);
    return session;
  }

  setFromServer(context: IReqAndRes, payload: IUser): void {
    const token = this.jwtRepo.create(payload);
    this.auth.setServerCookieJWT(context, token);
  }

  remove(context: IReqAndRes):void{
    this.auth.removeServerCookieJWT(context);
  }
}
