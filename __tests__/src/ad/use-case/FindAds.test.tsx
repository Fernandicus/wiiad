import { AdRepository } from "@/src/ad/domain/AdRepository";
import { AdvertiserId } from "@/src/advertiser/domain/value-objects/AdvertiserId";
import { UniqId } from "@/src/utils/UniqId";
import { FindAds } from "@/src/ad/use-case/FindAds";

describe("Given then FindAds use case", () => {
  it("If user has ads return all ads", async () => {
    const advertiserId = UniqId.generate();
    const repository: AdRepository = {
      findAllByAdvertiserId: jest.fn(),
      remove: jest.fn(),
      save: jest.fn(),
    };
    const findAds = new FindAds(repository);
    await findAds.findAllByAdvertiserId(
      new AdvertiserId(advertiserId)
    );
    expect(repository.findAllByAdvertiserId).toHaveBeenCalledWith(advertiserId)
  });
});
