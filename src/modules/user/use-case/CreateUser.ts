import { IUserRepo } from "../domain/IUserRepo";
import { User } from "../domain/User";

export class CreateUser {
  constructor(private userRepo: IUserRepo) {}

  async create(user: User): Promise<void> {
    await this.userRepo.save(user.toPrimitives());
  }
}
