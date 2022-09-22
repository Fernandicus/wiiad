import { AdRepository } from "@/src/ad/domain/AdRepository";
import { AdId } from "@/src/ad/domain/value-objects/AdId";
import { RemoveAd } from "@/src/ad/use-case/RemoveAd";

describe("On RemoveAd use case, GIVEN a repository and ad id", () => {
  const repository: AdRepository = {
    save: jest.fn(),
    findAllByAdvertiserId: jest.fn(),
    remove: jest.fn(),
  };
  const adId = new AdId("1234");

  it(`WHEN call the RemoveAd byId method, 
  THEN the repository remove method must be called with the ad id`, async () => {
    const removeAd = new RemoveAd(repository);
    await removeAd.byId(adId);
    expect(repository.remove).toBeCalledWith(adId.id);
  });
});
