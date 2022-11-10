import { Email } from "@/src/domain/Email";
import { Name } from "@/src/domain/Name";
import { UniqId } from "@/src/utils/UniqId";
import { Advertiser } from "./Advertiser";

export interface IAdvertiserRepo {
  save(advertiser: Advertiser): Promise<void>;
  findById(id: UniqId): Promise<Advertiser | null>;
  findByEmail(email:Email): Promise<Advertiser | null>;
  findByName(name: Name): Promise<Advertiser | null>;
}
