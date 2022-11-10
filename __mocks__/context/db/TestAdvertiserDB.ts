import { TestAdvertiserRepository } from "../../lib/modules/advertiser/domain/TestAdvertiserRepository";
import { TestAdvertiserMongoDBRepo } from "../../lib/modules/advertiser/infrastructure/TestAdvertiserMongoDBRepo";
import { FakeAdvertiser } from "../../lib/modules/advertiser/FakeAdvertiser";
import { Advertiser } from "@/src/modules/advertiser/domain/Advertiser";

export const setTestAdvertiserDB = async (): Promise<TestAdvertiserDB> => {
  const testAdvertiserRepo = await TestAdvertiserMongoDBRepo.init();
  return TestAdvertiserDB.setAndInit(testAdvertiserRepo);
};

class TestAdvertiserDB {
  readonly advertiserRepo;

  private constructor(advertiserRepo: TestAdvertiserRepository) {
    this.advertiserRepo = advertiserRepo;
  }

  static async setAndInit(advertiserRepo: TestAdvertiserRepository): Promise<TestAdvertiserDB> {
    const advertisers = this.setAdvertisers();
    await advertiserRepo.saveMany(advertisers);
    return new TestAdvertiserDB(advertiserRepo);
  }

  async getAllAdvertisers(): Promise<Advertiser[] | null> {
    const allAdvertisers = await this.advertiserRepo.getAllAdvertisers();
    return allAdvertisers;
  }

  async saveMany(advertisers: Advertiser[]): Promise<void> {
    await this.advertiserRepo.saveMany(advertisers);
  }

  private static setAdvertisers(): Advertiser[] {
    return FakeAdvertiser.createMany();
  }
}
