import { Ad } from "@/src/modules/ad/domain/Ad";

export interface TestAdRepository {
  saveMany(adsPrimitives: Ad[]): Promise<void>;
  getAllAds(): Promise<Ad[] | null>;
}
