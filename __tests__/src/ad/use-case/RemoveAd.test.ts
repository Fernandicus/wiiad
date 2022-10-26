import { AdRepository } from "@/src/modules/ad/domain/AdRepository";
import { RemoveAd } from "@/src/modules/ad/use-case/RemoveAd";
import { UniqId } from "@/src/utils/UniqId";

describe("On RemoveAd use case, GIVEN a repository and ad id", () => {
  const repository: AdRepository = {
    save: jest.fn(),
    findAllByAdvertiserId: jest.fn(),
    remove: jest.fn(),
    findByAdId: jest.fn(),
  };
  const adId = UniqId.new();

  it(`WHEN call the RemoveAd byId method, 
  THEN the repository remove method must be called with the ad id`, async () => {
    const removeAd = new RemoveAd(repository);
    await removeAd.byId(adId);
    expect(repository.remove).toBeCalledWith(adId.id);
  });
});
