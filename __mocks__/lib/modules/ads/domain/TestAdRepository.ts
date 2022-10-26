import { AdPropsPrimitives } from "@/src/modules/ad/domain/Ad";

export interface TestAdRepository {
  saveMany(adsPrimitives: AdPropsPrimitives[]): Promise<void>;
  getAllAds(): Promise<AdPropsPrimitives[] | null>;
}
