import { Ad } from "@/src/modules/ad/domain/Ad";
import { IAdRepository } from "@/src/modules/ad/domain/interfaces/IAdRepository";
import { UniqId } from "@/src/utils/UniqId";
import { FakeAd } from "../../__mocks__/lib/modules/ads/FakeAd";

export const mockedAdRepo = (adsToFind: Ad[]): IAdRepository => {
  const mockedAds = FakeAd.createManyWithRandomAdvertiserIds(5);
  const ads = [...mockedAds, ...adsToFind];
  return {
    remove: jest.fn(),
    save: jest.fn(),
    findAllByAdvertiserId: jest
      .fn()
      .mockImplementation((advertiserId: UniqId): Ad[] | null => {
        const adsFound = ads.filter(
          (ad) => ad.advertiserId.id == advertiserId.id
        );
        if (adsFound.length == 0) return null;
        return adsFound;
      }),
    findByAdId: jest.fn().mockImplementation((adId: UniqId): Ad | null => {
      const adFound = ads.find((ad) => ad.id.id == adId.id);
      if (!adFound) return null;
      return adFound;
    }),
  };
};
