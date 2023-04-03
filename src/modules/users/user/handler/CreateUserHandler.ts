import { Email } from "@/src/common/domain/Email";
import { Name } from "@/src/common/domain/Name";
import { ProfilePic } from "@/src/common/domain/ProfilePic";
import { Role } from "@/src/common/domain/Role";
import { UniqId } from "@/src/common/domain/UniqId";
import { IUserPrimitives, User } from "../domain/User";
import { CreateUser } from "../use-case/CreateUser";

export class CreateUserHandler {
  constructor(private createUser: CreateUser) {}

  async create(user: IUserPrimitives): Promise<void> {
    const newUser = new User({
      id: new UniqId(user.id),
      name: new Name(user.name),
      email: new Email(user.email),
      role: new Role(user.role),
      profilePic: new ProfilePic(user.profilePic),
    });
    await this.createUser.create(newUser);
  }
}
