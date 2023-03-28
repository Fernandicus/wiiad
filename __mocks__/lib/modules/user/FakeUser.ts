import { Email } from "@/src/common/domain/Email";
import { Name } from "@/src/common/domain/Name";
import { ProfilePic } from "@/src/common/domain/ProfilePic";
import { Role, RoleType } from "@/src/common/domain/Role";
import {
  IUserPrimitives,
  IUserProps,
  User,
} from "@/src/modules/users/user/domain/User";
import { UniqId } from "@/src/common/domain/UniqId";
import { faker } from "@faker-js/faker";

export class FakeUser extends User {
  constructor(params: IUserProps) {
    super(params);
  }

  static create(id: UniqId): User {
    const userPrimitives = this.generateRandom(id.id);
    return new User({
      id,
      email: new Email(userPrimitives.email),
      name: new Name(userPrimitives.name),
      role: new Role(userPrimitives.role),
      profilePic: ProfilePic.withDefaultUserPic(),
    });
  }

  static createWithRole(props: {id: UniqId, role: Role}): User {
    const userPrimitives = this.generateRandom(props.id.id);
    return new User({
      id: props.id,
      email: new Email(userPrimitives.email),
      name: new Name(userPrimitives.name),
      role: props.role,
      profilePic: ProfilePic.withDefaultUserPic(),
    });
  }

  static createMany(amount = 5): User[] {
    let users: User[] = [];

    for (let i = 0; i < amount; i++) {
      users.push(this.create(UniqId.new()));
    }
    return users;
  }

  static createWithPrimitives(id: string): IUserPrimitives {
    const userPrimitives = this.generateRandom(id);
    return userPrimitives;
  }

  static createManyWithPrimitives(amount: number): IUserPrimitives[] {
    let userPrimitives: IUserPrimitives[] = [];

    for (let i = 1; i < amount; i++) {
      userPrimitives.push(this.generateRandom(UniqId.generate()));
    }

    return userPrimitives;
  }

  private static generateRandom(id: string): IUserPrimitives {
    return {
      id,
      email: faker.internet.email(),
      name: faker.name.firstName(),
      role: RoleType.USER,
      profilePic: ProfilePic.defaultUserPic,
    };
  }
}
