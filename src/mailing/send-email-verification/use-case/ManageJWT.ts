import { IJsonWebTokenRepo } from "../domain/IJsonWebTokenRepo";

export class ManageJWT {
  constructor(private jwtrepo: IJsonWebTokenRepo) {}

  createToken<T extends object>(payload: T): string {
    return this.jwtrepo.create<T>(payload);
  }

  decodeToken<T extends object>(token: string):T {
    return this.jwtrepo.decode(token);
  }

  verifyToken<T extends object>(token:string):T{
    return this.jwtrepo.verify(token)
  }
}
