import { UniqId } from "@/src/common/domain/UniqId";
import { Ad } from "../Ad";

export interface IAdRepository {
  save(model: Ad): Promise<void>;
  findAllByAdvertiserId(id: UniqId): Promise<Ad[] | null>;
  remove(id: UniqId): Promise<void>;
  findByAdId(id: UniqId): Promise<Ad | null>;
}
