import { AdModel, AdModelProps } from "@/src/ad/infraestructure/AdModel";
import { UniqId } from "@/src/utils/UniqId";
import mongoose from "mongoose";
import { FakeAd } from "../../../../__mocks__/lib/ads/FakeAd";
import { TestAdMongoDBRepository } from "../../../../__mocks__/lib/ads/infraestructure/TestAdMongoDBRepository";
import { AdMongoDBRepository } from "@/src/ad/infraestructure/AdMongoDBRepository";
import { TestCreateAd } from "../../../../__mocks__/lib/ads/use-case/TestCreateAd";
import { TestCreateAdController } from "../../../../__mocks__/lib/ads/controller/TestCreateAdController";

describe("On AdMongoDBRepository, GIVEN an advertiserId and a list of ads", () => {
  let fakeAds: FakeAd[];
  let adMongoDBRepo: AdMongoDBRepository;
  let advertiserId: string;

  beforeAll(async () => {
    const testAdRepo = await TestAdMongoDBRepository.init();
    const testCreateAd = new TestCreateAd(testAdRepo)
    const testCreateAdController = new TestCreateAdController(testCreateAd);
    const createdAdsData = await testCreateAdController.crateMany();
    fakeAds = createdAdsData.fakeAds;
    advertiserId = createdAdsData.advertiserId;
    adMongoDBRepo = new AdMongoDBRepository();
  }, 8000);

  afterAll(async () => {
    await TestAdMongoDBRepository.disconnectMongoDB();
  }, 8000);

  it(`WHEN create a new ad and call repository save method, 
  THEN it should be saved in MongoDB`, async () => {
    const adId = UniqId.generate();
    const fakeAd = FakeAd.createPrimitivesWithGivenIds({ advertiserId, adId });

    await adMongoDBRepo.save(fakeAd);

    const adInRepository = await AdModel.findOne({ _id: fakeAd.id });

    expect(adInRepository!.id).toBe(fakeAd.id);
    expect(adInRepository!.title).toBe(fakeAd.title);
    expect(adInRepository!.description).toBe(fakeAd.description);
    expect(adInRepository!.image).toBe(fakeAd.image);
    expect(adInRepository!.advertiserId).toBe(fakeAd.advertiserId);
    expect(adInRepository!.redirectionUrl).toBe(fakeAd.redirectionUrl);
    expect(adInRepository!.segments).toEqual(
      expect.arrayContaining(fakeAd.segments)
    );
  }, 8000);

  it("WHEN call repository findAllByAdvertiserId, THEN find the same amount of ads that in MongoDB", async () => {
    const adsFound = await adMongoDBRepo.findAllByAdvertiserId(advertiserId);
    const count = await AdModel.count({ advertiserId });

    expect(count).toBe(adsFound.length);
  }, 8000);

  it("WHEN call the repository remove method, THEN the selected ad should be deleted it from the DB", async () => {
    await adMongoDBRepo.remove(fakeAds[0].id.id);
    const adFound = await AdModel.findById(fakeAds[0].id.id);
    expect(adFound).toBe(null);
  }, 8000);
});
