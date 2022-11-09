import { UniqId } from "@/src/utils/UniqId";
import { Ad, AdPropsPrimitives } from "./Ad";

export interface AdRepository {
  save(model: Ad): Promise<void>;
  findAllByAdvertiserId(id: UniqId): Promise<Ad[] | null>;
  remove(id: UniqId): Promise<void>;
  findByAdId(id: UniqId): Promise<Ad | null>;
}
