import { Ad, AdPropsPrimitives } from "./Ad";

export interface AdRepository {
  save(model: AdPropsPrimitives): Promise<void>;
  findAllByAdvertiserId(id: string): Promise<AdPropsPrimitives[]>;
  remove(id: string): Promise<void>;
}
