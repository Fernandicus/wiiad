import { AdModelProps } from "@/src/ad/infraestructure/AdModel";

export interface TestRepository {
  saveMany(adsModel: AdModelProps[]): Promise<void>;
}
