import { ErrorCreatingAd } from "@/src/modules/ad/domain/ErrorCreatingAd";
import { CreateAd } from "@/src/modules/ad/use-case/CreateAd";
import { FakeAd } from "../../../../__mocks__/lib/modules/ads/FakeAd";
import { AdRepository } from "@/src/modules/ad/domain/AdRepository";
import { UniqId } from "@/src/utils/UniqId";
import { Ad } from "@/src/modules/ad/domain/Ad";

describe("On CreateAd use case, GIVEN a repository and an ad", () => {
  let mockedRepo: AdRepository;
  let advertiserId: UniqId;
  let adId: UniqId;
  let ad: Ad;
  let createAd: CreateAd;

  beforeAll(() => {
    mockedRepo = {
      save: jest.fn(),
      findAllByAdvertiserId: jest.fn(),
      remove: jest.fn(),
      findByAdId: jest.fn(),
    };
    advertiserId = UniqId.new();
    adId = UniqId.new();
    ad = FakeAd.createWithGivenIds({ advertiserId, adId });
    createAd =  new CreateAd(mockedRepo);
  });

  it(`WHEN call the CreateAd save method,
  THEN the repository save method must be called with the ad data`, async () => {
    await createAd.save(ad);
    expect(mockedRepo.save).toBeCalledWith(ad);
  });

  it("WHEN try to create an empty Ad, THEN throw 'ErrorCreatingAd'", () => {
    expect(() => {
      FakeAd.empty();
    }).toThrowError(ErrorCreatingAd);
  });
});
