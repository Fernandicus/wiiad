import { Email } from "@/src/common/domain/Email";
import { Name } from "@/src/common/domain/Name";
import { Advertiser } from "@/src/modules/advertiser/domain/Advertiser";
import { IAdvertiserRepo } from "@/src/modules/advertiser/domain/IAdvertiserRepo";
import { ErrorFindingAdvertiser } from "@/src/modules/advertiser/domain/ErrorFindingAdvertiser";
import { FindAdvertiser } from "@/src/modules/advertiser/use-case/FindAdvertiser";
import { mockedAdvertiserRepo } from "../../../../__mocks__/context/MockAdvertiserRepo";
import { FakeAdvertiser } from "../../../../__mocks__/lib/modules/advertiser/FakeAdvertiser";

describe("On FindAdvertiser, GIVEN AdvertiserRepo", () => {
  let advertiser: Advertiser;
  let mockRepo: IAdvertiserRepo;
  let findAdvertiser: FindAdvertiser;

  beforeAll(() => {
    advertiser = FakeAdvertiser.create();
    mockRepo = mockedAdvertiserRepo(advertiser);
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
