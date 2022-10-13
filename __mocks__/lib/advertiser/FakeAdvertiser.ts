import {
  Advertiser,
  AdvertiserProps,
  AdvertiserPropsPrimitives,
} from "@/src/modules/advertiser/domain/Advertiser";
import { AdvertiserId } from "@/src/modules/advertiser/domain/value-objects/AdvertiserId";
import {
  Rol,
  RolType,
} from "@/src/domain/Rol";
import { Email } from "@/src/domain/Email";
import { Name } from "@/src/domain/Name";
import { UniqId } from "@/src/utils/UniqId";
import { faker } from "@faker-js/faker";

export class FakeAdvertiser extends Advertiser {
  constructor(props: AdvertiserProps) {
    super(props);
  }

  static create(rol = RolType.BUSINESS): FakeAdvertiser {
    const primaryData = this.generateFakeData();
    const advertiser = this.generateAdvertiser({
      ...primaryData,
      rol,
    });
    return new FakeAdvertiser({ ...advertiser });
  }

  static createPrimitives(rol = RolType.BUSINESS): AdvertiserPropsPrimitives {
    const primaryData = this.generateFakeData();
    return {
      ...primaryData,
      rol,
    };
  }

  private static generateFakeData(): {
    email: string;
    name: string;
    id: string;
  } {
    return {
      email: faker.internet.email() ,
      name: faker.company.name(),
      id: UniqId.generate(),
    };
  }

  private static generateAdvertiser(
    primitives: AdvertiserPropsPrimitives
  ): Advertiser {
    return new Advertiser({
      id: new AdvertiserId(primitives.id),
      email: new Email(primitives.email),
      name: new Name(primitives.name),
      rol: new Rol(primitives.rol),
    });
  }
}
