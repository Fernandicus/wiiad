import jwt from "jsonwebtoken";
import { IJsonWebTokenRepo } from "../domain/IJsonWebTokenRepo";

export class JsonWebTokenNPM implements IJsonWebTokenRepo {
  verify<T>(token: string): T {
    return jwt.verify(token, process.env.JWT_SECRET!) as T;
  }

  decode<T extends object>(token: string): T {
    return jwt.decode(token) as T;
  }

  create<T extends string | object | Buffer >(payload: T): string {
    return jwt.sign(payload, process.env.JWT_SECRET!);
  }
}
