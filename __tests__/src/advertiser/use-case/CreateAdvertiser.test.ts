import { Advertiser } from "@/src/modules/advertiser/domain/Advertiser";
import { AdvertiserRepo } from "@/src/modules/advertiser/domain/AdvertiserRepo";
import { CreateAdvertiser } from "@/src/modules/advertiser/use-case/CreateAdvertiser";
import { FakeAdvertiser } from "../../../../__mocks__/lib/modules/advertiser/FakeAdvertiser";

describe("On CreateAdvertiser use case, GIVEN an advertiser and an advertiser repo", () => {
  let advertiser: Advertiser;
  let advertiserRepoMock: AdvertiserRepo;

  beforeAll(() => {
    advertiser = FakeAdvertiser.create();
    advertiserRepoMock = {
      findById: jest.fn(),
      save: jest.fn(),
      findByEmail: jest.fn(),
      findByName: jest.fn(),
    };
  });

  it(`WHEN call the save method, 
    THEN the advertiser repository save method should be called with the advertiser props`, async () => {
    const createAdvertiser = new CreateAdvertiser(advertiserRepoMock);
    await createAdvertiser.create(advertiser);
    expect(advertiserRepoMock.save).toBeCalledWith(advertiser.toPrimitives());
  });
});
