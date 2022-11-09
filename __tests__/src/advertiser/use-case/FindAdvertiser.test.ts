import { Email } from "@/src/domain/Email";
import { Name } from "@/src/domain/Name";
import { Advertiser } from "@/src/modules/advertiser/domain/Advertiser";
import { AdvertiserRepo } from "@/src/modules/advertiser/domain/AdvertiserRepo";
import { ErrorFindingAdvertiser } from "@/src/modules/advertiser/domain/ErrorFindingAdvertiser";
import { FindAdvertiser } from "@/src/modules/advertiser/use-case/FindAdvertiser";
import { FakeAdvertiser } from "../../../../__mocks__/lib/modules/advertiser/FakeAdvertiser";

describe("On FindAdvertiser, GIVEN AdvertiserRepo", () => {
  let advertiser: Advertiser;
  let mockRepo: AdvertiserRepo;
  let findAdvertiser: FindAdvertiser;

  beforeAll(() => {
    advertiser = FakeAdvertiser.create();
    mockRepo = {
      findByEmail: jest.fn().mockImplementation((email: Email) => {
        if (email.email !== advertiser.email.email) return null;
        return advertiser;
      }),
      findByName: jest.fn().mockImplementation((name: Name) => {
        if (name.name !== advertiser.name.name) return null;
        return advertiser;
      }),
      findById: jest.fn(),
      save: jest.fn(),
    };
    findAdvertiser = new FindAdvertiser(mockRepo);
  });

  it(`WHEN call byEmail method,
  THEN repo byEmail should return advertiser`, async () => {
    const advertiserFound = await findAdvertiser.byEmail(advertiser.email);
    expect(mockRepo.findByEmail).toBeCalledWith(advertiser.email);
    expect(advertiserFound).toEqual(advertiser);
  });

  it(`WHEN call byEmail method for a not existing email,
  THEN a ErrorFindingAdvertiser should be thrown`, async () => {
    expect(findAdvertiser.byEmail(new Email("x@x.com"))).rejects.toThrowError(
      ErrorFindingAdvertiser
    );
  });

  it(`WHEN call byUserName method,
  THEN repo findByName method should return advertiser`, async () => {
    const advertiserFound = await findAdvertiser.byUserName(advertiser.name);
    expect(mockRepo.findByName).toBeCalledWith(advertiser.name);
    expect(advertiserFound).toEqual(advertiser);
  });

  it(`WHEN call byUserName method for a not existing name,
  THEN a ErrorFindingAdvertiser should be thrown`, async () => {
    expect(findAdvertiser.byUserName(new Name("Paco"))).rejects.toThrowError(
      ErrorFindingAdvertiser
    );
  });
});
