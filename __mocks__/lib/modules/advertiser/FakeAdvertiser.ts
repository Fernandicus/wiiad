import {
  Advertiser,
  AdvertiserPropsPrimitives,
} from "@/src/modules/advertiser/domain/Advertiser";
import { Role, RoleType } from "@/src/common/domain/Role";
import { Email } from "@/src/common/domain/Email";
import { Name } from "@/src/common/domain/Name";
import { UniqId } from "@/src/utils/UniqId";
import { faker } from "@faker-js/faker";
import { IGenericUserProps } from "@/src/common/domain/interfaces/GenericUser";
import { ProfilePic } from "@/src/common/domain/ProfilePic";

export class FakeAdvertiser extends Advertiser {
  constructor(props: IGenericUserProps) {
    super(props);
  }

  static create(role = RoleType.BUSINESS): Advertiser {
    const primaryData = this.generateFakeData();
    const advertiser = this.generateAdvertiser({
      ...primaryData,
      role,
    });
    return new Advertiser({ ...advertiser });
  }

  static createMany(amount = 5, role = RoleType.BUSINESS): Advertiser[] {
    let advertisers: Advertiser[] = [];

    for (let i = 0; i < amount; i++) {
      advertisers.push(this.create(role));
    }

    return advertisers;
  }

  static createPrimitives(role = RoleType.BUSINESS): AdvertiserPropsPrimitives {
    const primaryData = this.generateFakeData();
    return {
      ...primaryData,
      role,
    };
  }

  static createManyWithPrimitives(
    rol = RoleType.BUSINESS,
    amount = 5
  ): AdvertiserPropsPrimitives[] {
    let advertisers: AdvertiserPropsPrimitives[] = [];

    for (let i = 0; i < amount; i++) {
      advertisers.push(this.createPrimitives(rol));
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
    primitives: AdvertiserPropsPrimitives
  ): Advertiser {
    return new Advertiser({
      id: new UniqId(primitives.id),
      email: new Email(primitives.email),
      name: new Name(primitives.name),
      role: new Role(primitives.role),
      profilePic: ProfilePic.withDefaultAdvertiserPic(),
    });
  }
}
