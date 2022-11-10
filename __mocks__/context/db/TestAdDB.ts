import { Ad } from "@/src/modules/ad/domain/Ad";
import { UniqId } from "@/src/utils/UniqId";
import { TestAdRepository } from "../../lib/modules/ads/domain/TestAdRepository";
import { FakeAd } from "../../lib/modules/ads/FakeAd";
import { TestAdMongoDBRepository } from "../../lib/modules/ads/infraestructure/TestAdMongoDBRepository";

export const setTestAdDB = async (amount: number): Promise<TestAdDB> => {
  const testAdRepo = await TestAdMongoDBRepository.init();
  return TestAdDB.setAndInit(testAdRepo, amount);
};

export class TestAdDB {
  readonly adRepo;

  private constructor(adRepo: TestAdRepository) {
    this.adRepo = adRepo;
  }

  static async setAndInit(
    adRepo: TestAdRepository,
    amount: number
  ): Promise<TestAdDB> {
    const ads = this.setAds(amount);
    await adRepo.saveMany(ads);

    return new TestAdDB(adRepo);
  }

  async getAllAds(): Promise<Ad[] | null> {
    const allAds = await this.adRepo.getAllAds();
    return allAds;
  }

  async saveMany(ads: Ad[]): Promise<void> {
    await this.adRepo.saveMany(ads);
  }

  private static setAds(amount: number): Ad[] {
    return FakeAd.createMany(UniqId.new(), amount);
  }
}
