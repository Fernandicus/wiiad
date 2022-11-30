import { Advertiser, AdvertiserPropsPrimitives } from "@/src/modules/advertiser/domain/Advertiser";
import { RoleType } from "@/src/common/domain/Role";
import { AdvertiserModel } from "@/src/modules/advertiser/infraestructure/AdvertiserModel";
import { AdvertiserMongoDBRepo } from "@/src/modules/advertiser/infraestructure/AdvertiserMongoDBRepo";
import { FakeAdvertiser } from "../../../../__mocks__/lib/modules/advertiser/FakeAdvertiser";
import { setTestAdvertiserDB } from "../../../../__mocks__/lib/infrastructure/db/TestAdvertiserDB";
import { UniqId } from "@/src/utils/UniqId";
import { Email } from "@/src/common/domain/Email";

describe("On AdvertiserMongoDBRepo, GIVEN an Advertiser and an Advertiser MongoDB Repo", () => {
  let advertiser: Advertiser;
  let advertiserRepo: AdvertiserMongoDBRepo;

  beforeAll(async () => {
    await setTestAdvertiserDB();
    advertiser = FakeAdvertiser.create(RoleType.BUSINESS);
    advertiserRepo = new AdvertiserMongoDBRepo();
  }, 8000);

  it("WHEN call save method, THEN advertiser is saved in MongoDB and foundedById ", async () => {
    await advertiserRepo.save(advertiser);
    const advertiserFound = await advertiserRepo.findById(advertiser.id);
    expect(advertiserFound?.name).toEqual(advertiser.name);
    expect(advertiserFound?.email).toEqual(advertiser.email);
    expect(advertiserFound?.role).toEqual(advertiser.role);
  }, 8000);

  it("WHEN call findById for a non existing ID, THEN return null", async () => {
    const advertiserFound = await advertiserRepo.findById(UniqId.new());
    expect(advertiserFound).toEqual(null);
  }, 8000);

  it(`WHEN call findByEmail method, 
  THEN return the saved advertiser in MongoDB`, async () => {
    const advertiserFound = await advertiserRepo.findByEmail(advertiser.email);
    expect(advertiserFound?.name).toEqual(advertiser.name);
    expect(advertiserFound?.email).toEqual(advertiser.email);
    expect(advertiserFound?.role).toEqual(advertiser.role);
  }, 8000);

  it(`WHEN call findByEmail method for a non existing advertiser email, 
  THEN return the saved advertiser in MongoDB`, async () => {
    const advertiserFound = await advertiserRepo.findByEmail(new Email("xxx@xxx.com"));
    expect(advertiserFound).toBe(null);
  }, 8000);
});
