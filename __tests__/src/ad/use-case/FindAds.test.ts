import { AdRepository } from "@/src/modules/ad/domain/AdRepository";
import { UniqId } from "@/src/utils/UniqId";
import { FindAds } from "@/src/modules/ad/use-case/FindAds";
import { AdPropsPrimitives } from "@/src/modules/ad/domain/Ad";
import { FakeAd } from "../../../../__mocks__/lib/modules/ads/FakeAd";

describe("On FindAds use case, GIVEN an advertiser id, a repository and some ads", () => {
  const advertiserId = UniqId.generate();
  const adsPrimitives: AdPropsPrimitives[] = FakeAd.createManyWithPrimitives(advertiserId, 5);
  const repository: AdRepository = {
    findAllByAdvertiserId: jest.fn().mockResolvedValue(adsPrimitives),
    remove: jest.fn(),
    save: jest.fn(),
    findByAdId: jest.fn(),
  };

  it(`WHEN call FindAds findAllByAdvertiserId, 
  THEN the repository findAllByAdvertiserId method should be called with the advertiser id`, async () => {
    const findAds = new FindAds(repository);
    const adsFound =  await findAds.findAllByAdvertiserId(new UniqId(advertiserId));

    expect(repository.findAllByAdvertiserId).toHaveBeenCalledWith(advertiserId);
    expect(adsFound?.length).toBe(adsPrimitives.length);
    adsFound?.forEach(ad=>{
      expect(ad.advertiserId.id).toBe(advertiserId);
    })
  });
});
