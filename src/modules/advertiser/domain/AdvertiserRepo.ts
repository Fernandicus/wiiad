import { AdvertiserPropsPrimitives } from "./Advertiser";

export interface AdvertiserRepo {
  save(model: AdvertiserPropsPrimitives): Promise<void>;
  findById(id: string): Promise<AdvertiserPropsPrimitives | null>;
  findByEmail(email:string): Promise<AdvertiserPropsPrimitives | null>;
  findByName(name: string): Promise<AdvertiserPropsPrimitives | null>;
}
