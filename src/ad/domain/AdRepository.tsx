import { AdPropsPrimitives } from "./Ad";

export interface AdRepository {
  save(model: unknown): Promise<void>;
  findAllByAdvertiserId(id: string): Promise<AdPropsPrimitives[]>;
  remove(id: string): Promise<void>;
}
