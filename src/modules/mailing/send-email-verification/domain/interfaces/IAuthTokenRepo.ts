import { IJsonWebTokenRepo } from "@/src/modules/session/domain/interfaces/IJsonWebTokenRepo";
import { AuthToken } from "../value-objects/AuthToken";

export interface IAuthJWTParams<T> {
  jwt: IJsonWebTokenRepo;
  payload: T;
  expiresIn: number;
}

export interface IAuthTokenRepo {
  generateString(): AuthToken;

  generateExpirationJWT<T extends object>({
    payload,
    expiresIn,
    jwt,
  }: IAuthJWTParams<T>): AuthToken;
}
