import { AdRepository } from "@/src/modules/ad/domain/AdRepository";
import { RemoveAd } from "@/src/modules/ad/use-case/RemoveAd";
import { UniqId } from "@/src/utils/UniqId";

describe("On RemoveAd use case, GIVEN a repository and ad id", () => {
  let repository: AdRepository;
  let adId: UniqId;
  let removeAd: RemoveAd;

  beforeAll(() => {
    repository = {
      save: jest.fn(),
      findAllByAdvertiserId: jest.fn(),
      remove: jest.fn(),
      findByAdId: jest.fn(),
    };
    adId = UniqId.new();
    removeAd = new RemoveAd(repository);
  });

  it(`WHEN call the RemoveAd byId method, 
  THEN the repository remove method must be called with the ad id`, async () => {
    await removeAd.byId(adId);
    expect(repository.remove).toBeCalledWith(adId);
  });
});
