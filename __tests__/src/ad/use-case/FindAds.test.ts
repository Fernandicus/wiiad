import { AdRepository } from "@/src/ad/domain/AdRepository";
import { AdvertiserId } from "@/src/advertiser/domain/value-objects/AdvertiserId";
import { UniqId } from "@/src/utils/UniqId";
import { FindAds } from "@/src/ad/use-case/FindAds";
import { AdPropsPrimitives } from "@/src/ad/domain/Ad";
import { FakeAd } from "../../../../__mocks__/lib/ads/FakeAd";

describe("On FindAds use case, GIVEN an advertiser id, a repository and some ads", () => {
  const advertiserId = UniqId.generate();
  const amount = Math.floor(Math.random() * 5);
  const adsPrimitives: AdPropsPrimitives[] = FakeAd.createManyWithPrimitives(advertiserId, amount);
  const repository: AdRepository = {
    findAllByAdvertiserId: jest.fn().mockResolvedValue(adsPrimitives),
    remove: jest.fn(),
    save: jest.fn(),
  };

  it(`WHEN call FindAds findAllByAdvertiserId, 
  THEN the repository findAllByAdvertiserId method should be called with the advertiser id`, async () => {
    const findAds = new FindAds(repository);
    const adsFound =  await findAds.findAllByAdvertiserId(new AdvertiserId(advertiserId));

    expect(repository.findAllByAdvertiserId).toHaveBeenCalledWith(advertiserId);
    expect(adsFound.length).toBe(amount);
    adsFound.forEach(ad=>{
      expect(ad.advertiserId).toBe(advertiserId);
    })
  });
});
