import { IAuthTokenRepo } from "../domain/IAuthTokenRepo";
import crypto from "crypto";
import { AuthToken } from "../domain/AuthToken";

export class AuthTokenCrypto implements IAuthTokenRepo {
  generate(): AuthToken {
    const randomString = crypto.randomBytes(8).toString("hex");
    return new AuthToken(randomString);
  }
}
