import { AdModelProps } from "@/src/ad/infraestructure/AdModel";

export interface TestAdRepository {
  saveMany(adsModel: AdModelProps[]): Promise<void>;
}
