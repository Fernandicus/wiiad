import { IAuthCookies, IReqAndRes } from "../domain/interfaces/IAuthCookies";
import { IGenericUserPrimitives } from "../../../domain/GenericUser";
import { IJsonWebTokenRepo } from "../domain/interfaces/IJsonWebTokenRepo";

export class UserSession {
  constructor(
    private authCookie: IAuthCookies,
    private jwtRepo: IJsonWebTokenRepo
  ) {}

  getFromServer(context: IReqAndRes): IGenericUserPrimitives | null {
    const token = this.authCookie.getServerJWT(context);
    if (!token) return null;
    const session = this.jwtRepo.verify<IGenericUserPrimitives>(token);
    return session;
  }

  setFromServer(context: IReqAndRes, payload: IGenericUserPrimitives): void {
    const token = this.jwtRepo.create(payload);
    this.authCookie.setServerJWT(context, token);
  }

  remove(context: IReqAndRes): void {
    this.authCookie.removeServerJWT(context);
  }
}
