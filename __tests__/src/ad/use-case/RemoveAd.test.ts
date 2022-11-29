import { IAdRepository } from "@/src/modules/ad/domain/interfaces/IAdRepository";
import { RemoveAd } from "@/src/modules/ad/use-case/RemoveAd";
import { UniqId } from "@/src/utils/UniqId";
import { FakeAd } from "../../../../__mocks__/lib/modules/ads/FakeAd";
import { mockedAdRepo } from "../../../../__mocks__/context/MockAdRepo";

describe("On RemoveAd use case, GIVEN a repository and ad id", () => {
  let mockedRepo: IAdRepository;
  let adId: UniqId;
  let removeAd: RemoveAd;

  beforeAll(() => {
    adId = UniqId.new()
    const ad = FakeAd.create(adId);
    mockedRepo = mockedAdRepo([ad]);
    removeAd = new RemoveAd(mockedRepo);
  });

  it(`WHEN call the RemoveAd byId method, 
  THEN the repository remove method must be called with the ad id`, async () => {
    await removeAd.byId(adId);
    expect(mockedRepo.remove).toBeCalledWith(adId);
  });
});
