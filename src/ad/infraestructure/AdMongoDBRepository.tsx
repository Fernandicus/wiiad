import mongoose from "mongoose";
import { Ad } from "../domain/Ad";
import { Repository } from "../domain/Repository";
import { AdModel } from "./AdModel";

interface AdModelProps {
  title: string;
  description: string;
  image: string;
  redirectionUrl: string;
  advertiserId: number;
}

export class AdMongoDBRepository implements Repository {
  private constructor() {}

  static async connect(): Promise<AdMongoDBRepository> {
    const mongoIsDisonnected =
      mongoose.connection.readyState === mongoose.ConnectionStates.disconnected;

    if (mongoIsDisonnected) {
      const mongoDBUrl = process.env.MONGODB_URL;
      if (!mongoDBUrl) throw new Error("DB url doesn't provided");
      await mongoose.connect(mongoDBUrl);
    }
    return new AdMongoDBRepository();
  }

  public async disconnect(): Promise<void> {
    const mongoIsConnected =
      mongoose.connection.readyState === mongoose.ConnectionStates.connected;

    if (mongoIsConnected) {
      await mongoose.disconnect();
    }
  }

  public async save(ad: Ad): Promise<string> {
    const { title, description, image, redirectionUrl, advertiserId }: Ad = ad;

    const adModel = new AdModel({
      title: title.title,
      description: description.description,
      image: image.image,
      redirectionUrl: redirectionUrl.url,
      advertiserId: new mongoose.Types.ObjectId(advertiserId.id),
    });

    const savedAd = await adModel.save();

    return savedAd.id;
  }

  //TODO: find by ADVERTISER ID
  public async findById(id: string): Promise<AdModelProps | void> {
    const adModel = await AdModel.findById<AdModelProps>(id);
    if (!adModel) return;

    return adModel;
  }
}
