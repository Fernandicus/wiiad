import mongoose from "mongoose";
import { Ad } from "../domain/Ad";
import { Repository } from "../domain/Repository";
import { AdModel } from "./AdModel";

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

  public async save(ad: Ad): Promise<void> {
    const title = ad.title.title;
    const description = ad.description.description;
    const image = ad.image.image;
    const redirectionUrl = ad.redirectionUrl.url;
    const adModel = new AdModel({ title, description, image, redirectionUrl });
    await adModel.save();
  }
}
