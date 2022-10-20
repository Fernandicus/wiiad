import { ErrorCreatingAd } from "@/src/modules/ad/domain/ErrorCreatingAd";
import { CreateAd } from "@/src/modules/ad/use-case/CreateAd";
import { FakeAd } from "../../../../__mocks__/lib/ads/FakeAd";
import { AdRepository } from "@/src/modules/ad/domain/AdRepository";
import { UniqId } from "@/src/utils/UniqId";
import { AdvertiserId } from "@/src/modules/advertiser/domain/value-objects/AdvertiserId";
import { AdDescription } from "@/src/modules/ad/domain/value-objects/AdDescription";
import { AdImageUrl } from "@/src/modules/ad/domain/value-objects/AdImageUrl";
import { AdRedirectionUrl } from "@/src/modules/ad/domain/value-objects/AdRedirectionUrl";
import { AdSegments } from "@/src/modules/ad/domain/value-objects/AdSegments";
import { AdTitle } from "@/src/modules/ad/domain/value-objects/AdTitle";

describe("On CreateAd use case, GIVEN a repository and an ad", () => {
  const mockedRepository: AdRepository = {
    save: jest.fn(),
    findAllByAdvertiserId: jest.fn(),
    remove: jest.fn(),
  };
  const advertiserId = UniqId.generate();
  const adId = UniqId.generate();
  const ad = FakeAd.createPrimitivesWithGivenIds({ advertiserId, adId });

  it(`WHEN call the CreateAd save method,
  THEN the repository save method must be called with the ad data`, async () => {
    const createAd = new CreateAd(mockedRepository);
    await createAd.save(
      new FakeAd({
        id: new UniqId(ad.id),
        advertiserId: new AdvertiserId(ad.advertiserId),
        description: new AdDescription(ad.description),
        image: new AdImageUrl(ad.image),
        redirectionUrl: new AdRedirectionUrl(ad.redirectionUrl),
        segments: new AdSegments(ad.segments),
        title: new AdTitle(ad.title),
      })
    );

    expect(mockedRepository.save).toBeCalledWith(ad);
  });

  it("WHEN try to create an empty Ad, THEN throw 'ErrorCreatingAd'", () => {
    expect(() => {
      FakeAd.empty();
    }).toThrowError(ErrorCreatingAd);
  });
});
