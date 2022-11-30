import { CreateAd } from "@/src/modules/ad/use-case/CreateAd";
import { FakeAd } from "../../../../__mocks__/lib/modules/ads/FakeAd";
import { IAdRepository } from "@/src/modules/ad/domain/interfaces/IAdRepository";
import { UniqId } from "@/src/utils/UniqId";
import { Ad } from "@/src/modules/ad/domain/Ad";
import { mockedAdRepo } from "../../../../__mocks__/context/MockAdRepo";

describe("On CreateAd use case, GIVEN a repository and an ad", () => {
  let mockedRepo: IAdRepository;
  let ad: Ad;
  let createAd: CreateAd;

  beforeAll(() => {
    ad = FakeAd.createWithGivenIds({
      advertiserId: UniqId.new(),
      adId: UniqId.new(),
    });
    const ads = FakeAd.createMany(UniqId.new(), 3);
    mockedRepo = mockedAdRepo(ads);
    createAd = new CreateAd(mockedRepo);
  });

  it(`WHEN call the CreateAd save method,
  THEN the repository save method must be called with the ad data`, async () => {
    await createAd.save(ad);
    expect(mockedRepo.save).toBeCalledWith(ad);
  });

  it("WHEN try to create an empty Ad, THEN throw 'Error'", () => {
    expect(() => {
      FakeAd.empty();
    }).toThrowError(Error);
  });
});
