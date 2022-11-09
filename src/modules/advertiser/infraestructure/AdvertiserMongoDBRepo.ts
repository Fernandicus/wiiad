import { Email } from "@/src/domain/Email";
import { Name } from "@/src/domain/Name";
import { ProfilePic } from "@/src/domain/ProfilePic";
import { Role } from "@/src/domain/Role";
import { UniqId } from "@/src/utils/UniqId";
import { Advertiser } from "../domain/Advertiser";
import { AdvertiserRepo } from "../domain/AdvertiserRepo";
import { AdvertiserModel, IAdvertiserModel } from "./AdvertiserModel";

export class AdvertiserMongoDBRepo implements AdvertiserRepo {
  async save(advertiser: Advertiser): Promise<void> {
    await AdvertiserModel.create({
      ...advertiser.toPrimitives(),
      _id: advertiser.id.id,
    } as IAdvertiserModel);
  }

  async findByName(name: Name): Promise<Advertiser | null> {
    const advertiserModel = await AdvertiserModel.findOne<IAdvertiserModel>({
      name: name.name,
    } as IAdvertiserModel);
    if (!advertiserModel) return null;
    return this.returnAdvertiser(advertiserModel);
  }

  async findById(id: UniqId): Promise<Advertiser | null> {
    const advertiserModel = await AdvertiserModel.findById<IAdvertiserModel>(
      id.id
    );
    if (!advertiserModel) return null;
    return this.returnAdvertiser(advertiserModel);
  }

  async findByEmail(email: Email): Promise<Advertiser | null> {
    const advertiserModel = await AdvertiserModel.findOne<IAdvertiserModel>({
      email: email.email,
    } as IAdvertiserModel);
    if (!advertiserModel) return null;
    return this.returnAdvertiser(advertiserModel);
  }

  private returnAdvertiser(advertiser: IAdvertiserModel): Advertiser {
    return new Advertiser({
      id: new UniqId(advertiser._id),
      name: new Name(advertiser.name),
      email: new Email(advertiser.email),
      role: new Role(advertiser.role),
      profilePic: new ProfilePic(advertiser.profilePic),
    });
  }
}
