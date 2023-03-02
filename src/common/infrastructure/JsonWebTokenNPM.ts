import { projectConfig } from "@/src/utils/projectConfig";
import jwt from "jsonwebtoken";
import { IJsonWebTokenRepo } from "../domain/interfaces/IJsonWebTokenRepo";

export class JsonWebTokenNPM implements IJsonWebTokenRepo {
  verify<T>(token: string): T {
    return jwt.verify(token, projectConfig.JWT.secret!) as T;
  }

  decode<T extends object>(token: string): T {
    return jwt.decode(token) as T;
  }

  create(payload: string | object | Buffer): string {
    return jwt.sign(payload, projectConfig.JWT.secret!);
  }

  /**
   * @param expiresIn Expressed in seconds. Eg: 60 [1min], 900 [15min], etc..
   */
  withExpirationDate(
    payload: string | object | Buffer,
    expiresIn: number
  ): string {
    return jwt.sign(payload, projectConfig.JWT.secret!, { expiresIn });
  }
}
