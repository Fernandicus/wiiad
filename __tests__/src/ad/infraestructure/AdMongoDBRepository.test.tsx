import { ErrorCreatingAd } from "@/src/ad/domain/ErrorCreatingAd";
import { AdMongoDBRepository } from "@/src/ad/infraestructure/AdMongoDBRepository";
import { AdUniqId } from "@/src/ad/infraestructure/AdUniqId";
import { FakeAd } from "../../../../__mocks__/lib/advertise/FakeAd";

describe("Given AdMongoDBRepository", () => {
  it("When save Ad data should be saved in MongoDB Atlas", async () => {
    const advertiserId = AdUniqId.generate();
    const adId = AdUniqId.generate();
    const ad = FakeAd.withIds({advertiserId, adId});

    const adMongoDBRepository = await AdMongoDBRepository.connect();
    await adMongoDBRepository.save(ad);

    const adInRepository = await adMongoDBRepository.findAllByAdvertiserId(
      advertiserId
    );

    await adMongoDBRepository.disconnect();
    
    const adFound = adInRepository.find(
      (advertise) => advertise.title === ad.title.title
    );

    expect(adFound!.id).toBe(ad.id.id);
    expect(adFound!.title).toBe(ad.title.title);
    expect(adFound!.description).toBe(ad.description.description);
    expect(adFound!.image).toBe(ad.image.image);
    expect(adFound!.advertiserId).toBe(ad.advertiserId.id);
    expect(adFound!.redirectionUrl).toBe(ad.redirectionUrl.url);
    expect(adFound!.segments).toEqual(
      expect.arrayContaining(ad.segments.segments)
    );
  });
});
