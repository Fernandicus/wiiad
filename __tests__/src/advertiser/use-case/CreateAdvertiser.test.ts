import { Advertiser } from "@/src/advertiser/domain/Advertiser";
import { ErrorCreatingAdvertiser } from "@/src/advertiser/domain/ErrorCreatingAdvertiser";
import { AdvertiserId } from "@/src/advertiser/domain/value-objects/AdvertiserId";
import {
  Rol,
  RolType,
} from "@/src/domain/Rol";
import { AdvertiserRepo } from "@/src/advertiser/domain/AdvertiserRepo";
import { CreateAdvertiser } from "@/src/advertiser/use-case/CreateAdvertiser";
import { Email } from "@/src/domain/Email";
import { Name } from "@/src/domain/Name";
import { UniqId } from "@/src/utils/UniqId";

describe("On CreateAdvertiser use case, GIVEN an advertiser and an advertiser repo", () => {
  let advertiser: Advertiser;
  let advertiserRepoMock: AdvertiserRepo;

  beforeAll(() => {
    advertiser = new Advertiser({
      id: new AdvertiserId(UniqId.generate()),
      name: new Name("NAME"),
      email: new Email("test@test.com"),
      rol: new Rol(RolType.BUSINESS),
    });
    advertiserRepoMock = {
      findById: jest.fn(),
      save: jest.fn(),
    };
  });

  it(`WHEN call the save method, 
    THEN the advertiser repository save method should be called with the advertiser props`, async () => {
    const createAdvertiser = new CreateAdvertiser(advertiserRepoMock);
    await createAdvertiser.create(advertiser);
    expect(advertiserRepoMock.save).toBeCalledWith(advertiser.toPrimitives());
  });
});
