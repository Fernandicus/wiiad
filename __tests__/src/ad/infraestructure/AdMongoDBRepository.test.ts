import {
  AdModel,
  IAdModelProps,
} from "@/src/modules/ad/infraestructure/db/AdModel";
import { UniqId } from "@/src/common/domain/UniqId";
import { FakeAd } from "../../../../__mocks__/lib/modules/ads/FakeAd";
import { setTestAdDB } from "../../../../__mocks__/lib/infrastructure/db/TestAdDB";
import { Ad } from "@/src/modules/ad/domain/Ad";
import { FakeAdvertiser } from "../../../../__mocks__/lib/modules/user/FakeAdvertiser";
import { User } from "@/src/modules/users/user/domain/User";
import { AdMongoDBRepository } from "@/src/modules/ad/infraestructure/db/AdMongoDBRepository";

describe("On AdMongoDBRepository, GIVEN an advertiserId and a list of ads", () => {
  let fakeAds: Ad[];
  let adMongoDBRepo: AdMongoDBRepository;
  let advertiser: User;

  beforeAll(async () => {
    const advertisers = FakeAdvertiser.createMany(5);
    const testAdDB = await setTestAdDB(advertisers);
    advertiser = advertisers[0];
    fakeAds = FakeAd.createMany(advertiser.id, 5);
    await testAdDB.saveMany(fakeAds);
    adMongoDBRepo = new AdMongoDBRepository();
  }, 8000);

  it(`WHEN create a new ad and call repository save method, 
  THEN it should be saved and foundedById in MongoDB`, async () => {
    const adId = UniqId.new();
    const advertiserId = advertiser.id;
    const fakeAd = FakeAd.createWithGivenIds({ advertiserId, adId });

    await adMongoDBRepo.save(fakeAd);

    const adInRepository = await adMongoDBRepo.findByAdId(fakeAd.id);

    expect(adInRepository!.id).toEqual(fakeAd.id);
    expect(adInRepository!.title).toEqual(fakeAd.title);
    expect(adInRepository!.description).toEqual(fakeAd.description);
    expect(adInRepository!.file).toEqual(fakeAd.file);
    expect(adInRepository!.advertiserId).toEqual(fakeAd.advertiserId);
    expect(adInRepository!.redirectionUrl).toEqual(fakeAd.redirectionUrl);
    expect(adInRepository!.segments).toEqual(fakeAd.segments);
  }, 8000);

  it("WHEN call repository findAllByAdvertiserId for an existing ad, THEN return same amount of ads in array", async () => {
    const advertiserId = advertiser.id;
    const adsFound = await adMongoDBRepo.findAllByAdvertiserId(advertiserId);
    const count = await AdModel.count({
      advertiserId: advertiserId.id,
    } as IAdModelProps);

    expect(count).toBe(adsFound!.length);
  }, 8000);

  it("WHEN call repository findAllByAdvertiserId for an not existing ad, THEN return null", async () => {
    const nonExistingId = UniqId.new()
    const adsFound = await adMongoDBRepo.findAllByAdvertiserId(nonExistingId);
    expect(adsFound).toBe(null);
  }, 8000);

  it(`WHEN call findByAdId method, THEN the selected ad should be returned from the DB`, async () => {
    const adFound = await adMongoDBRepo.findByAdId(fakeAds[0].id);
    expect(adFound).toEqual(fakeAds[0]);
  }, 8000);

  it(`WHEN call findByAdId method with a not existing ad, THEN null should be returned from the DB`, async () => {
    const adFound = await adMongoDBRepo.findByAdId(UniqId.new());
    expect(adFound).toBe(null);
  }, 8000);

  it("WHEN call the repository remove method, THEN the selected ad should be deleted it from the DB", async () => {
    await adMongoDBRepo.remove(fakeAds[0].id);
    const adFound = await adMongoDBRepo.findByAdId(fakeAds[0].id);
    expect(adFound).toBe(null);
  }, 8000);
});
