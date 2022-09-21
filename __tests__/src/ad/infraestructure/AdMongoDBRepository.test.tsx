import { AdvertiserId } from "@/src/ad/domain/ValueObjects/AdvertiserId";
import { AdModel } from "@/src/ad/infraestructure/AdModel";
import { AdUniqId } from "@/src/ad/infraestructure/AdUniqId";
import { MongoDB } from "@/src/ad/infraestructure/MongoDB";
import { FindAds } from "@/src/ad/use-case/FindAds";
import mongoose from "mongoose";
import { FakeAd } from "../../../../__mocks__/lib/advertise/FakeAd";

describe("Given AdMongoDBRepository", () => {
  beforeAll(async () => {
    const mongoDBUrl: string = process.env.MONGODB_URL!;
    await mongoose.connect(mongoDBUrl);
    await AdModel.deleteMany({});
  }, 8000);

  afterAll(async () => {
    await mongoose.disconnect();
  }, 8000);

  it("When save ad data it should be saved in MongoDB", async () => {
    const advertiserId = AdUniqId.generate();
    const adId = AdUniqId.generate();
    const ad = FakeAd.withIds({ advertiserId, adId });

    const adRepository = await MongoDB.adRepository();
    await adRepository.save(ad);

    const adInRepository = await AdModel.findById(adId);

    expect(adInRepository!.id).toBe(ad.id.id);
    expect(adInRepository!.title).toBe(ad.title.title);
    expect(adInRepository!.description).toBe(ad.description.description);
    expect(adInRepository!.image).toBe(ad.image.image);
    expect(adInRepository!.advertiserId).toBe(ad.advertiserId.id);
    expect(adInRepository!.redirectionUrl).toBe(ad.redirectionUrl.url);
    expect(adInRepository!.segments).toEqual(
      expect.arrayContaining(ad.segments.segments)
    );
  }, 8000);

  it("Given an existing ad in MongoDB when call the remove method it should delete it from the DB", async () => {
    const advertiserId = AdUniqId.generate();
    const adId = AdUniqId.generate();
    const adData = FakeAd.withIds({ advertiserId, adId });
    const ad = new AdModel({
      title: adData.title.title,
      description: adData.description.description,
      _id: adData.id.id,
      advertiserId: adData.advertiserId.id,
      image: adData.image.image,
      redirectionUrl: adData.redirectionUrl.url,
      segments: adData.segments.segments,
    });
    await ad.save();

    const adRepository = await MongoDB.adRepository();
    await adRepository.remove(adData.id.id);
    const adFound = await AdModel.findById(adData.id.id);

    expect(adFound).toBe(null);
  }, 8000);

  it.only("Given some existing ads in MongoDB when call findAllByAdvertiserId expect to find the same ads that in MongoDB", async () => {
    const adsToGenerate = Math.floor(Math.random() * 5);
    const advertiserId = AdUniqId.generate();
    
    for (var i = 0; i <= adsToGenerate; i++) {
      const adId = AdUniqId.generate();
      const adData = FakeAd.withIds({ advertiserId, adId });
      const ad = new AdModel({
        title: adData.title.title,
        description: adData.description.description,
        _id: adData.id.id,
        advertiserId: adData.advertiserId.id,
        image: adData.image.image,
        redirectionUrl: adData.redirectionUrl.url,
        segments: adData.segments.segments,
      });
      await ad.save();
    }

    const adRepository = await MongoDB.adRepository();
    const adsFound = await adRepository.findAllByAdvertiserId(advertiserId);
    const count = await AdModel.count({ advertiserId });

    expect(count).toBe(adsFound.length);

  }, 12000);
});
