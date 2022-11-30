
import { Role, RoleType } from "@/src/common/domain/Role";
import { Email } from "@/src/common/domain/Email";
import { Name } from "@/src/common/domain/Name";
import { UniqId } from "@/src/utils/UniqId";
import { faker } from "@faker-js/faker";
import { ProfilePic } from "@/src/common/domain/ProfilePic";
import { IUserPrimitives, IUserProps, User } from "@/src/modules/users/user/domain/User";

export class FakeAdvertiser extends User {
  constructor(props: IUserProps) {
    super(props);
  }

  static create(): User {
    const primaryData = this.generateFakeData();
    const advertiser = this.generateAdvertiser({
      ...primaryData,
      role: RoleType.BUSINESS,
    });
    return new User({ ...advertiser });
  }

  static createMany(amount = 5): User[] {
    let advertisers: User[] = [];

    for (let i = 0; i < amount; i++) {
      advertisers.push(this.create());
    }

    return advertisers;
  }

  static createPrimitives(): IUserPrimitives {
    const primaryData = this.generateFakeData();
    return {
      ...primaryData,
      role: RoleType.BUSINESS,
    };
  }

  static createManyWithPrimitives(
    amount = 5
  ): IUserPrimitives[] {
    let advertisers: IUserPrimitives[] = [];

    for (let i = 0; i < amount; i++) {
      advertisers.push(this.createPrimitives());
    }
    return advertisers;
  }

  private static generateFakeData(): {
    email: string;
    name: string;
    id: string;
    profilePic: string;
  } {
    return {
      email: faker.internet.email(),
      name: faker.company.name(),
      id: UniqId.generate(),
      profilePic: ProfilePic.defaultAdvertiserPic,
    };
  }

  private static generateAdvertiser(
    primitives: IUserPrimitives
  ): User {
    return new User({
      id: new UniqId(primitives.id),
      email: new Email(primitives.email),
      name: new Name(primitives.name),
      role: new Role(primitives.role),
      profilePic: ProfilePic.withDefaultAdvertiserPic(),
    });
  }
}
