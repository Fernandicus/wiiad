import mongoose from "mongoose";
import { Ad } from "../domain/Ad";
import { Repository } from "../domain/Repository";
import AdDescription from "../domain/ValueObjects/AdDescription";
import AdImage from "../domain/ValueObjects/AdImage";
import AdRedirectionUrl from "../domain/ValueObjects/AdRedirectionUrl";
import AdTitle from "../domain/ValueObjects/AdTitle";
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

  public async save(ad: Ad): Promise<string> {
    const title = ad.title.title;
    const description = ad.description.description;
    const image = ad.image.image;
    const redirectionUrl = ad.redirectionUrl.url;
    const adModel = new AdModel({ title, description, image, redirectionUrl });
    const savedAd = await adModel.save();
    return savedAd.id;
  }

  public async findById(id: string): Promise<Ad | void> {
    const adModel = await AdModel.findById(id);
    if(!adModel) return;
    
    const title = new AdTitle(adModel.title);
    const description = new AdDescription(adModel.description);
    const image = new AdImage(adModel.image);
    const redirectionUrl = new AdRedirectionUrl(adModel.redirectionUrl);

    return new Ad({ title, description, image, redirectionUrl });
  }
}
