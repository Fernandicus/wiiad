import { AdvertiserPropsPrimitives } from "./Advertiser";

export interface AdvertiserRepo {
  save(model: AdvertiserPropsPrimitives): Promise<void>;
  findById(id: string): Promise<AdvertiserPropsPrimitives | null>;
  //remove(id: string): Promise<void>;
}
