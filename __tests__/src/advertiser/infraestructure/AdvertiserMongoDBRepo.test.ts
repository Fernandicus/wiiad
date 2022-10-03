import { AdvertiserPropsPrimitives } from "@/src/advertiser/domain/Advertiser";
import { AdvertiserRolType } from "@/src/advertiser/domain/value-objects/AdvertiserRol";
import { AdvertiserModel } from "@/src/advertiser/infraestructure/AdvertiserModel";
import { AdvertiserMongoDBRepo } from "@/src/advertiser/infraestructure/AdvertiserMongoDBRepo";
import { TestAdvertiserMongoDBRepo } from "../../../../__mocks__/lib/advertiser/infrastructure/TestAdvertiserMongoDBRepo";
import { FakeAdvertiser } from "../../../../__mocks__/lib/advertiser/FakeAdvertiser";

describe("On AdvertiserMongoDBRepo, GIVEN an Advertiser and an Advertiser MongoDB Repo", () => {
  let advertiser: AdvertiserPropsPrimitives;
  let advertiserRepo: AdvertiserMongoDBRepo;

  beforeAll(async () => {
    await TestAdvertiserMongoDBRepo.connectAndClean();

    advertiser = FakeAdvertiser.createPrimitives(AdvertiserRolType.BUSINESS);
    advertiserRepo = new AdvertiserMongoDBRepo();
  }, 8000);

  afterAll(async () => {
    await TestAdvertiserMongoDBRepo.disconnect();
  },8000);

  it("WHEN call advertiser repository save method, THEN advertiser is saved in MongoDB", async () => {
    await advertiserRepo.save(advertiser);
    const advertiserFound = await AdvertiserModel.findById(advertiser.id);
    expect(advertiserFound?.name).toBe(advertiser.name);
    expect(advertiserFound?.email).toBe(advertiser.email);
    expect(advertiserFound?.rol).toBe(advertiser.rol);
  },8000);

  it("WHEN call advertiser repository findById method, THEN return the saved advertiser in MongoDB", async () => {
    const advertiserFound = await advertiserRepo.findById(advertiser.id);
    expect(advertiserFound?.name).toBe(advertiser.name);
    expect(advertiserFound?.email).toBe(advertiser.email);
    expect(advertiserFound?.rol).toBe(advertiser.rol);
  },8000);

  it("WHEN call findById with a non existing ID, THEN return null", async () => {
    const advertiserFound = await advertiserRepo.findById("12345");
    expect(advertiserFound).toBe(null);
  },8000);
});
