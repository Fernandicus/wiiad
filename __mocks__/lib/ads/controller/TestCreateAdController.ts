import { Ad } from "@/src/ad/domain/Ad";
import { UniqId } from "@/src/utils/UniqId";
import { TestAdRepository } from "../domain/TestAdRepository";
import { FakeAd } from "../FakeAd";
import { TestCreateAd } from "../use-case/TestCreateAd";

export class TestCreateAdController {
  constructor(private testCreateAd: TestCreateAd) {}

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
