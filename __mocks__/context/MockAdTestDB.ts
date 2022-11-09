import { Ad, AdPropsPrimitives } from "@/src/modules/ad/domain/Ad";
import { UniqId } from "@/src/utils/UniqId";
import { TestAdRepository } from "__mocks__/lib/modules/ads/domain/TestAdRepository";
import { FakeAd } from "../../__mocks__/lib/modules/ads/FakeAd";
import { TestAdMongoDBRepository } from "../../__mocks__/lib/modules/ads/infraestructure/TestAdMongoDBRepository";

export const mockedAdRepo = async (amount: number): Promise<MockAdTestDB> => {
  const testAdRepo = await TestAdMongoDBRepository.init();
  return MockAdTestDB.setAndInit(testAdRepo, amount);
};

export class MockAdTestDB {
  readonly adRepo;

  private constructor(adRepo: TestAdRepository) {
    this.adRepo = adRepo;
  }

  static async setAndInit(
    adRepo: TestAdRepository,
    amount: number
  ): Promise<MockAdTestDB> {
    const ads = this.setAds(amount);
    await adRepo.saveMany(ads);

    return new MockAdTestDB(adRepo);
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
