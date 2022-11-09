import { Advertiser } from "@/src/modules/advertiser/domain/Advertiser";

export interface TestAdvertiserRepository {
  saveMany(advertiser: Advertiser[]): Promise<void>;
  getAllAdvertisers(): Promise<Advertiser[] | null>
}
