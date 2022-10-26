import { AdPropsPrimitives } from "@/src/modules/ad/domain/Ad";
import { UniqId } from "@/src/utils/UniqId";
import { TestAdRepository } from "__mocks__/lib/modules/ads/domain/TestAdRepository";
import { FakeAd } from "../../__mocks__/lib/modules/ads/FakeAd";
import { TestAdMongoDBRepository } from "../../__mocks__/lib/modules/ads/infraestructure/TestAdMongoDBRepository";

export const mockedAdRepo = async (): Promise<MockAdTestDB> => {
  const testAdRepo = await TestAdMongoDBRepository.init();
  return MockAdTestDB.setAndInit(testAdRepo);
};

class MockAdTestDB {
  readonly adRepo;

  private constructor(adRepo: TestAdRepository) {
    this.adRepo = adRepo;
  }

  static async setAndInit(adRepo: TestAdRepository): Promise<MockAdTestDB> {
    const ads = this.setAds();
    await adRepo.saveMany(ads);
    return new MockAdTestDB(adRepo);
  }

  async getAllAds(): Promise<AdPropsPrimitives[] | null> {
    const allAds = await this.adRepo.getAllAds();
    return allAds;
  }

  async saveMany(adsPrimitives: AdPropsPrimitives[]): Promise<void> {
    this.adRepo.saveMany(adsPrimitives);
  }

  private static setAds(): AdPropsPrimitives[] {
    return FakeAd.createManyWithPrimitives(UniqId.generate());
  }
}
