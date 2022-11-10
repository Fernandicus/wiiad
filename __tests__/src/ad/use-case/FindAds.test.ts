import { AdRepository } from "@/src/modules/ad/domain/AdRepository";
import { UniqId } from "@/src/utils/UniqId";
import { FindAds } from "@/src/modules/ad/use-case/FindAds";
import { Ad } from "@/src/modules/ad/domain/Ad";
import { FakeAd } from "../../../../__mocks__/lib/modules/ads/FakeAd";
import { Advertiser } from "@/src/modules/advertiser/domain/Advertiser";
import { FakeAdvertiser } from "../../../../__mocks__/lib/modules/advertiser/FakeAdvertiser";
import { ErrorFindingAd } from "@/src/modules/ad/domain/ErrorFindingAd";

describe("On FindAds use case, GIVEN an advertiser id, a repository and some ads", () => {
  let advertiser: Advertiser;
  let ads: Ad[];
  let repository: AdRepository;
  let findAds: FindAds;

  beforeAll(() => {
    advertiser = FakeAdvertiser.create();
    ads = FakeAd.createMany(advertiser.id, 5);
    repository = {
      findAllByAdvertiserId: jest
        .fn()
        .mockImplementation((advertiserId: UniqId) => {
          if (advertiserId.id !== advertiser.id.id) return null;
          return ads;
        }),
      remove: jest.fn(),
      save: jest.fn(),
      findByAdId: jest.fn().mockImplementation((adId: UniqId) => {
        const adFound = ads.find((ad) => ad.id == adId);
        if (!adFound) return null;
        return adFound;
      }),
    };
    findAds = new FindAds(repository);
  });

  it(`WHEN call findAllByAdvertiserId, 
  THEN the repository findAllByAdvertiserId method should be called with the advertiser id`, async () => {
    const adsFound = await findAds.findAllByAdvertiserId(advertiser.id);

    expect(repository.findAllByAdvertiserId).toHaveBeenCalledWith(
      advertiser.id
    );
    expect(adsFound?.length).toEqual(ads.length);
    adsFound?.forEach((ad) => {
      expect(ad.advertiserId).toEqual(advertiser.id);
    });
  });

  it(`WHEN call findAllByAdvertiserId for a non existing id, 
  THEN a ErrorFindingAd exception should be thrown`, async () => {
    expect(findAds.findAllByAdvertiserId(UniqId.new())).rejects.toThrowError(
      ErrorFindingAd
    );
  });

  it(`WHEN call findByAdId, 
  THEN the repository findByAdId method should be called with the ad id`, async () => {
    const findAd = ads[0];
    const adFound = await findAds.findByAdId(findAd.id);
    expect(repository.findByAdId).toHaveBeenCalledWith(findAd.id);
    expect(adFound).toEqual(findAd);
  });

  it(`WHEN call findByAdId for a non existing id, 
  THEN a ErrorFindingAd exception should be thrown`, async () => {
    expect(findAds.findByAdId(UniqId.new())).rejects.toThrowError(
      ErrorFindingAd
    );
  });
});
