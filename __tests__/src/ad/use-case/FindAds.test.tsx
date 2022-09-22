import { AdRepository } from "@/src/ad/domain/AdRepository";
import { AdvertiserId } from "@/src/advertiser/domain/value-objects/AdvertiserId";
import { UniqId } from "@/src/utils/UniqId";
import { FindAds } from "@/src/ad/use-case/FindAds";

describe("On FindAds use case, GIVEN an advertiser id and a repository", () => {
  const advertiserId = UniqId.generate();
  const repository: AdRepository = {
    findAllByAdvertiserId: jest.fn(),
    remove: jest.fn(),
    save: jest.fn(),
  };
  
  it(`WHEN call FindAds findAllByAdvertiserId, 
  THEN the repository findAllByAdvertiserId should be called with the advertiser id`, async () => {
    const findAds = new FindAds(repository);
    await findAds.findAllByAdvertiserId(new AdvertiserId(advertiserId));
    expect(repository.findAllByAdvertiserId).toHaveBeenCalledWith(advertiserId);
  });
});
