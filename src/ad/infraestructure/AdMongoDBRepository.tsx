import mongoose, { Schema } from "mongoose";
import { Ad, AdPropsPrimitives } from "../domain/Ad";
import { ErrorCreatingAd } from "../domain/ErrorCreatingAd";
import { Repository } from "../domain/Repository";
import { AdModel, AdModelProps } from "./AdModel";

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
    try {
      const advertiserObjectId = new mongoose.Types.ObjectId(
        ad.advertiserId.id
      );
      const adModel = new AdModel({
        title: ad.title.title,
        description: ad.description.description,
        image: ad.image.image,
        redirectionUrl: ad.redirectionUrl.url,
        advertiserId: advertiserObjectId,
        segments: ad.segments.segments,
      });

      await adModel.save();
    } catch (err) {
      if (err instanceof TypeError)
        throw new ErrorCreatingAd("Error saving AdvertiserId", err.message);
      throw new ErrorCreatingAd("Something went wrong saving ad in MongoDB");
    }
  }

  public async findAllByAdvertiserId(id: string): Promise<AdPropsPrimitives[]> {
    const adModel = await AdModel.find<AdModelProps>({
      advertiserId: new mongoose.Types.ObjectId(id),
    });

    const adPrimitivesArray = adModel.map((model): AdPropsPrimitives => {
      return {
        title: model.title,
        description: model.description,
        image: model.image,
        redirectionUrl: model.redirectionUrl,
        segments: model.segments,
        advertiserId: model.advertiserId.toHexString(),
      };
    });

    return adPrimitivesArray;
  }
}
