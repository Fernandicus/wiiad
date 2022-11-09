import { TestAdvertiserRepository } from "../../__mocks__/lib/modules/advertiser/domain/TestAdvertiserRepository";
import { TestAdvertiserMongoDBRepo } from "../../__mocks__/lib/modules/advertiser/infrastructure/TestAdvertiserMongoDBRepo";
import { FakeAdvertiser } from "../../__mocks__/lib/modules/advertiser/FakeAdvertiser";
import { Advertiser, AdvertiserPropsPrimitives } from "@/src/modules/advertiser/domain/Advertiser";

export const mockedAdvertiserRepo = async (): Promise<MockAdvertiserTestDB> => {
  const testAdvertiserRepo = await TestAdvertiserMongoDBRepo.init();
  return MockAdvertiserTestDB.setAndInit(testAdvertiserRepo);
};

class MockAdvertiserTestDB {
  readonly advertiserRepo;

  private constructor(advertiserRepo: TestAdvertiserRepository) {
    this.advertiserRepo = advertiserRepo;
  }

  static async setAndInit(advertiserRepo: TestAdvertiserRepository): Promise<MockAdvertiserTestDB> {
    const advertisers = this.setAdvertisers();
    await advertiserRepo.saveMany(advertisers);
    return new MockAdvertiserTestDB(advertiserRepo);
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
