import { AuthToken } from "../domain/value-objects/AuthToken";
import {
  IAuthJWTParams,
  IAuthTokenRepo,
} from "../domain/interfaces/IAuthTokenRepo";

export class CreateAuthToken {
  constructor(private authToken: IAuthTokenRepo) {}

  generateString(): AuthToken {
    return this.authToken.generateString();
  }

  generateExpirationJWT<T extends object>({
    expiresIn,
    jwt,
    payload,
  }: IAuthJWTParams<T>): AuthToken {
    return this.authToken.generateExpirationJWT({ jwt, payload, expiresIn });
  }
}
