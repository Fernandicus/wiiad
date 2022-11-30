import { Email } from "@/src/common/domain/Email";
import { Name } from "@/src/common/domain/Name";
import { UniqId } from "@/src/utils/UniqId";
import { Advertiser } from "./Advertiser";

export interface IAdvertiserRepo {
  save(advertiser: Advertiser): Promise<void>;
  findById(id: UniqId): Promise<Advertiser | null>;
  findByEmail(email:Email): Promise<Advertiser | null>;
  findByName(name: Name): Promise<Advertiser | null>;
}
