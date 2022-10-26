import { AdPropsPrimitives } from "@/src/modules/ad/domain/Ad";

export interface TestAdRepository {
  saveMany(adsModel: AdPropsPrimitives[]): Promise<void>;
}
