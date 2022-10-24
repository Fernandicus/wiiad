import { IUserPrimitives } from "./User";

export interface IUserRepo {
  save(user: IUserPrimitives): Promise<void>;
  findByEmail(email: string): Promise<IUserPrimitives | null>;
}
