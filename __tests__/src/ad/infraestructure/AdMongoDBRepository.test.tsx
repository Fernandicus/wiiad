import { ErrorCreatingAd } from "@/src/ad/domain/ErrorCreatingAd";
import { AdMongoDBRepository } from "@/src/ad/infraestructure/AdMongoDBRepository";
import mongoose from "mongoose";
import { FakeAd } from "../../../../__mocks__/lib/advertise/FakeAd";

describe("Given AdMongoDBRepository", () => {
  it("When save Ad data should be saved in MongoDB Atlas", async () => {
    const advertiserId = new mongoose.Types.ObjectId().toHexString();
    const adId = new mongoose.Types.ObjectId().toHexString();
    const ad = FakeAd.withIds({advertiserId, adId});

    const adMongoDBRepository = await AdMongoDBRepository.connect();
    await adMongoDBRepository.save(ad);

    const adInRepository = await adMongoDBRepository.findAllByAdvertiserId(
      advertiserId
    );

    adMongoDBRepository.disconnect();
    const adFound = adInRepository.find(
      (advertise) => advertise.title === ad.title.title
    );

    expect(adFound!.title).toBe(ad.title.title);
    expect(adFound!.description).toBe(ad.description.description);
    expect(adFound!.image).toBe(ad.image.image);
    expect(adFound!.advertiserId).toBe(ad.advertiserId.id);
    expect(adFound!.redirectionUrl).toBe(ad.redirectionUrl.url);
    expect(adFound!.segments).toEqual(
      expect.arrayContaining(ad.segments.segments)
    );
  });

  it("When trying to save a not valid AdvertiserId (not valid ObjectId) in MongoDB expect an 'ErrorCreatingAd' ", async () => {
    const advertiserId = new mongoose.Types.ObjectId().toHexString();
    const adId = new mongoose.Types.ObjectId().toHexString();
    const ad = FakeAd.withIds({advertiserId, adId});
    const adMongoDBRepository = await AdMongoDBRepository.connect();

    expect(async () => {
      await adMongoDBRepository.save(ad);
    }).rejects.toThrowError(ErrorCreatingAd);
  });
});
