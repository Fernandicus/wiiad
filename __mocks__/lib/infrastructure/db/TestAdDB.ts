import { Ad } from "@/src/modules/ad/domain/Ad";
import { User } from "@/src/modules/users/user/domain/User";
import { UniqId } from "@/src/common/domain/UniqId";
import { TestAdRepository } from "../../modules/ads/domain/TestAdRepository";
import { FakeAd } from "../../modules/ads/FakeAd";
import { TestAdMongoDBRepository } from "../../modules/ads/infraestructure/TestAdMongoDBRepository";

export const setTestAdDB = async (advertisers: User[]): Promise<TestAdDB> => {
  const testAdRepo = await TestAdMongoDBRepository.init();
  return TestAdDB.setAndInit(testAdRepo, advertisers);
};

export class TestAdDB {
  private constructor(private adRepo: TestAdRepository) {}

  static async setAndInit(
    adRepo: TestAdRepository,
    advertisers: User[]
  ): Promise<TestAdDB> {
    const ads = this.setAds(advertisers);
    await adRepo.saveMany(ads);

    return new TestAdDB(adRepo);
  }

  async getAllAds(): Promise<Ad[]> {
    const allAds = await this.adRepo.getAllAds();
    if (!allAds) throw new Error("No ads available");
    return allAds;
  }

  async saveMany(ads: Ad[]): Promise<void> {
    await this.adRepo.saveMany(ads);
  }

  private static setAds(advertisers: User[]): Ad[] {
    const ads = advertisers.flatMap((advertiser) => {
      return FakeAd.createMany(advertiser.id, 3);
    });
    return ads;
  }
}
