import jwt from "jsonwebtoken";
import { IJsonWebTokenRepo } from "../domain/IJsonWebTokenRepo";

export class JsonWebTokenNPM implements IJsonWebTokenRepo {
  decode<T extends object>(token: string): T {
    return jwt.decode(token) as T;
  }

  create<T extends object>(payload: T): string {
    return jwt.sign(payload, process.env.JWT_SECRET!);
  }
}
