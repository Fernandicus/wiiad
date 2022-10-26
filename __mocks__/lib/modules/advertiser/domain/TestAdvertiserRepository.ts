import { AdvertiserPropsPrimitives } from "@/src/modules/advertiser/domain/Advertiser";

export interface TestAdvertiserRepository {
  saveMany(advertiserPrimitives: AdvertiserPropsPrimitives[]): Promise<void>;
  getAllAdvertisers(): Promise<AdvertiserPropsPrimitives[] | null>
}
