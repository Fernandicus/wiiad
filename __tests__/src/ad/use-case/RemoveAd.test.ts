import { Repository } from "@/src/ad/domain/Repository";
import { AdId } from "@/src/ad/domain/ValueObjects/AdId";
import { RemoveAd } from "@/src/ad/use-case/RemoveAd";

describe("Given then RemoveAd use case", () => {
  it("If ad id exists remove it", async () => {
    const repository: Repository = {
      save: jest.fn(),
      findAllByAdvertiserId: jest.fn(),
      remove: jest.fn(),
    };
    const removeAd = new RemoveAd(repository);
    const adId = new AdId("1234");
    await removeAd.byId(adId);

    expect(repository.remove).toBeCalledWith(adId.id)
  });
});
