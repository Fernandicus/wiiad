import { AdModel, AdModelProps } from "@/src/ad/infraestructure/AdModel";
import { UniqId } from "@/src/utils/UniqId";
import mongoose from "mongoose";
import { FakeAd } from "../../../../__mocks__/lib/advertise/FakeAd";
import { TestAdMongoDBRepository } from "../../../../__mocks__/lib/advertise/infraestructure/TestAdMongoDBRepository";
import { AdMongoDBRepository } from "@/src/ad/infraestructure/AdMongoDBRepository";
import { TestCreateAd } from "../../../../__mocks__/lib/advertise/use-case/TestCreateAd";


describe("On AdMongoDBRepository, GIVEN an advertiserId and a list of ads", () => {
  let fakeAds: FakeAd[];
  let adRepo: AdMongoDBRepository;
  let advertiserId: string;

  beforeAll(async () => {
    const testAdRepo = await TestAdMongoDBRepository.connect();
    await AdModel.deleteMany({});
    const createAd = new TestCreateAd(testAdRepo);
    const amount = Math.floor(Math.random() * 5);
    advertiserId = UniqId.generate();
    fakeAds = FakeAd.createMany(advertiserId, amount);
    await createAd.saveMany(fakeAds);
    adRepo = new AdMongoDBRepository();
  }, 8000);

  afterAll(async () => {
    await mongoose.disconnect();
  }, 8000);

  it(`WHEN create a new ad and call repository save method, 
  THEN it should be saved in MongoDB`, async () => {
    const adId = UniqId.generate();
    const fakeAd = FakeAd.withIds({ advertiserId, adId });

    await adRepo.save(fakeAd);

    const adInRepository = await AdModel.findOne({_id: fakeAd.id.id});

    expect(adInRepository!.id).toBe(fakeAd.id.id);
    expect(adInRepository!.title).toBe(fakeAd.title.title);
    expect(adInRepository!.description).toBe(fakeAd.description.description);
    expect(adInRepository!.image).toBe(fakeAd.image.image);
    expect(adInRepository!.advertiserId).toBe(fakeAd.advertiserId.id);
    expect(adInRepository!.redirectionUrl).toBe(fakeAd.redirectionUrl.url);
    expect(adInRepository!.segments).toEqual(
      expect.arrayContaining(fakeAd.segments.segments)
    );
  }, 8000);

  it("WHEN call findAllByAdvertiserId expect to find the same ads that in MongoDB", async () => {
    const adsFound = await adRepo.findAllByAdvertiserId(advertiserId);
    const count = await AdModel.count({ advertiserId });

    expect(count).toBe(adsFound.length);
  }, 8000);

  it("WHEN call the remove method it should delete it from the DB", async () => {
    await adRepo.remove(fakeAds[0].id.id);
    const adFound = await AdModel.findById(fakeAds[0].id.id);
    expect(adFound).toBe(null);
  }, 8000);
});
