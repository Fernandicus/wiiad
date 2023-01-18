import { IAuthJWTParams, IAuthTokenRepo } from "../domain/interfaces/IAuthTokenRepo";
import crypto from "crypto";
import { AuthToken } from "../domain/value-objects/AuthToken";

export class AuthTokenRepo implements IAuthTokenRepo {
  generateString(): AuthToken {
    const randomString = crypto.randomBytes(8).toString("hex");
    return new AuthToken(randomString);
  }

  generateExpirationJWT<T extends object>({
    payload,
    expiresIn,
    jwt,
  }: IAuthJWTParams<T>): AuthToken {
    const randomString = jwt.withExpirationDate(payload, expiresIn);
    return new AuthToken(randomString);
  }
}
