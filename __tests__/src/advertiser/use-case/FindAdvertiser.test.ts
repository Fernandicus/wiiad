import {
  Advertiser,
  AdvertiserPropsPrimitives,
} from "@/src/advertiser/domain/Advertiser";
import { AdvertiserRepo } from "@/src/advertiser/domain/AdvertiserRepo";
import { FindAdvertiser } from "@/src/advertiser/use-case/FindAdvertiser";
import { FakeAdvertiser } from "../../../../__mocks__/lib/advertiser/FakeAdvertiser";

describe("On FindAdvertiser, GIVEN AdvertiserRepo", () => {
  let advertiserPrimitives: AdvertiserPropsPrimitives;
  let advertiser: Advertiser;

  beforeAll(() => {
    advertiser = FakeAdvertiser.create();
    advertiserPrimitives = {
      id: advertiser.id.id,
      email: advertiser.email.email,
      name: advertiser.name.name,
      rol: advertiser.rol.rol,
    };
  });

  it(`WHEN try to find an existing advertiser,
  THEN FindAdvertiser byEmail should return advertiser with primitives`, async () => {
    const mockRepo: AdvertiserRepo = {
      findByEmail: jest.fn().mockResolvedValue(advertiserPrimitives),
      findById: jest.fn(),
      save: jest.fn(),
    };
    const findAdvertiser = new FindAdvertiser(mockRepo);
    const advertiserFound = await findAdvertiser.byEmail(advertiser.email);
    expect(mockRepo.findByEmail).toBeCalledWith(advertiser.email.email);
    expect(advertiserFound).toBe(advertiserPrimitives);
  });

  it(`WHEN try to find a non existing advertiser,
  THEN FindAdvertiser byEmail should return null`, async () => {
    const mockRepo: AdvertiserRepo = {
      findByEmail: jest.fn().mockResolvedValue(null),
      findById: jest.fn(),
      save: jest.fn(),
    };
    const findAdvertiser = new FindAdvertiser(mockRepo);
    const advertiserFound = await findAdvertiser.byEmail(advertiser.email);
    expect(mockRepo.findByEmail).toBeCalledWith(advertiser.email.email);
    expect(advertiserFound).toBe(null);
  });
});
