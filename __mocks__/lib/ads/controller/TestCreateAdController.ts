import { Ad } from "@/src/ad/domain/Ad";
import { UniqId } from "@/src/utils/UniqId";
import { TestRepository } from "../domain/TestRepository";
import { FakeAd } from "../FakeAd";
import { TestCreateAd } from "../use-case/TestCreateAd";

export class TestCreateAdController {
  private testCreateAd;

  constructor(private repository: TestRepository) {
    this.testCreateAd = new TestCreateAd(repository);
  }

/*   static async cleanAndInit(
    repository: TestRepository
  ): Promise<TestCreateAdController> {
    return new TestCreateAdController(repository);
  } */

  async crateMany(): Promise<{ advertiserId: string; fakeAds: Ad[] }> {
    const amount = Math.floor(Math.random() * 5);
    const advertiserId = UniqId.generate();
    const fakeAds = FakeAd.createMany(advertiserId, amount);
    await this.testCreateAd.saveMany(fakeAds);
    return {
      advertiserId,
      fakeAds,
    };
  }
}
