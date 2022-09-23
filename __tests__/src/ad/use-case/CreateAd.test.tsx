import { ErrorCreatingAd } from "@/src/ad/domain/ErrorCreatingAd";
import { CreateAd } from "@/src/ad/use-case/CreateAd";
import { FakeAd } from "../../../../__mocks__/lib/ads/FakeAd";
import { AdRepository } from "@/src/ad/domain/AdRepository";
import { UniqId } from "@/src/utils/UniqId";
import { AdvertiserId } from "@/src/advertiser/domain/value-objects/AdvertiserId";
import { AdDescription } from "@/src/ad/domain/value-objects/AdDescription";
import { AdId } from "@/src/ad/domain/value-objects/AdId";
import { AdImage } from "@/src/ad/domain/value-objects/AdImage";
import { AdRedirectionUrl } from "@/src/ad/domain/value-objects/AdRedirectionUrl";
import { AdSegments } from "@/src/ad/domain/value-objects/AdSegments";
import { AdTitle } from "@/src/ad/domain/value-objects/AdTitle";

describe("On CreateAd use case, GIVEN a repository and an ad", () => {
  const mockedRepository: AdRepository = {
    save: jest.fn(),
    findAllByAdvertiserId: jest.fn(),
    remove: jest.fn(),
  };
  const advertiserId = UniqId.generate();
  const adId = UniqId.generate();
  const ad = FakeAd.primitivesWithIds({ advertiserId, adId });

  it(`WHEN call the CreateAd save method,
  THEN the repository save method must be called with the ad data`, async () => {
    const createAd = new CreateAd(mockedRepository);
    await createAd.save(
      new FakeAd({
        id: new AdId(ad.id),
        advertiserId: new AdvertiserId(ad.advertiserId),
        description: new AdDescription(ad.description),
        image: new AdImage(ad.image),
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
