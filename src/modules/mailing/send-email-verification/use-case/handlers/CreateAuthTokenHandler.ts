import { JsonWebTokenNPM } from "@/src/modules/session/infrastructure/JsonWebTokenNPM";
import { AuthToken } from "../../domain/value-objects/AuthToken";
import { CreateAuthToken } from "../CreateAuthToken";

export class CreateAuthTokenHandler {
  constructor(private authTokenCreator: CreateAuthToken) {}

  jwtExpiresIn<T extends object>(
    payload: T,
    expiresIn: number,
    jwt = new JsonWebTokenNPM()
  ): AuthToken {
    return this.authTokenCreator.generateExpirationJWT({
      jwt,
      payload,
      expiresIn,
    });
  }

  jwtExpiresIn15Min<T extends object>(
    payload: T,
    jwt = new JsonWebTokenNPM()
  ): AuthToken {
    return this.authTokenCreator.generateExpirationJWT({
      jwt,
      payload,
      expiresIn: 900,
    });
  }
}
