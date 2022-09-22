import { ErrorCreatingAd } from "@/src/ad/domain/ErrorCreatingAd";
import { CreateAd } from "@/src/ad/use-case/CreateAd";
import { FakeAd } from "../../../../__mocks__/lib/ads/FakeAd";
import { AdRepository } from "@/src/ad/domain/AdRepository";
import { UniqId } from "@/src/utils/UniqId";

describe("On CreateAd use case, GIVEN a repository and an ad", () => {
  const mockedRepository: AdRepository = {
    save: jest.fn(),
    findAllByAdvertiserId: jest.fn(),
    remove: jest.fn(),
  };
  const advertiserId = UniqId.generate();
  const adId = UniqId.generate();
  const ad = FakeAd.withIds({ advertiserId, adId });

  it(`WHEN call the CreateAd save method,
  THEN the repository save method must be called with the ad data`, async () => {
    const createAd = new CreateAd(mockedRepository);
    await createAd.save(ad);

    expect(mockedRepository.save).toBeCalledWith(ad);
  });

  it("Throw 'ErrorCreatingAd' on empty advertise data", () => {
    expect(() => {
      FakeAd.empty();
    }).toThrowError(ErrorCreatingAd);
  });
});
