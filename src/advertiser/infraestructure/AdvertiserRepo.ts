import { AdvertiserPropsPrimitives } from "../domain/Advertiser";

export interface AdvertiserRepo {
  save(model: AdvertiserPropsPrimitives): Promise<void>;
  findAllByAdvertiserId(id: string): Promise<AdvertiserPropsPrimitives[]>;
  //remove(id: string): Promise<void>;
}
