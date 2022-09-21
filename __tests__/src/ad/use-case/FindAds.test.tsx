import { Ad } from "@/src/ad/domain/Ad";
import { AdRepository } from "@/src/ad/domain/AdRepository";
import { AdDescription } from "@/src/ad/domain/ValueObjects/AdDescription";
import { AdId } from "@/src/ad/domain/ValueObjects/AdId";
import { AdImage } from "@/src/ad/domain/ValueObjects/AdImage";
import { AdRedirectionUrl } from "@/src/ad/domain/ValueObjects/AdRedirectionUrl";
import { AdSegments } from "@/src/ad/domain/ValueObjects/AdSegments";
import { AdTitle } from "@/src/ad/domain/ValueObjects/AdTitle";
import { AdvertiserId } from "@/src/ad/domain/ValueObjects/AdvertiserId";
import { AdModel } from "@/src/ad/infraestructure/AdModel";
import { AdUniqId } from "@/src/ad/infraestructure/AdUniqId";
import { MongoDB } from "@/src/ad/infraestructure/MongoDB";
import { FindAds } from "@/src/ad/use-case/FindAds";

describe("Given then FindAds use case", () => {
  it("If user has ads return all ads", async () => {
    const advertiserId = AdUniqId.generate();
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
