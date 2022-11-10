import { IAuthTokenRepo } from "../domain/IAuthTokenRepo";
import crypto from "crypto";

export class AuthTokenCrypto implements IAuthTokenRepo {
  generate(): string {
    const randomString = crypto.randomBytes(8).toString("hex");
    return randomString;
  }
}
