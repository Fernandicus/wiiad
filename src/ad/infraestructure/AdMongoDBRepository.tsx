import mongoose from "mongoose";
import { Ad } from "../domain/Ad";
import { ErrorCreatingAd } from "../domain/ErrorCreatingAd";
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

  private isHex(h: string): Boolean {
    var a = parseInt(h, 16);
    console.log(a.toString(16) === h.toLowerCase())
    return a.toString(16) === h.toLowerCase();
  }

  public async save(ad: Ad): Promise<string> {
    const { title, description, image, redirectionUrl, advertiserId }: Ad = ad;
    try {
      const advertiserObjectId = new mongoose.Types.ObjectId(advertiserId.id);
      const adModel = new AdModel({
        title: title.title,
        description: description.description,
        image: image.image,
        redirectionUrl: redirectionUrl.url,
        advertiserId: advertiserObjectId,
      });

      const savedAd = await adModel.save();

      return savedAd.id;
     } catch (err) {
      if(err instanceof TypeError) throw new ErrorCreatingAd(err.message);
      throw new ErrorCreatingAd("Something went wrong saving ad in MongoDB");
    } 
  }

  //TODO: find by ADVERTISER ID
  public async findAllByAdvertiserId(id: string): Promise<AdModelProps[]> {
    const adModel = await AdModel.find<AdModelProps>({
      advertiserId: new mongoose.Types.ObjectId(id),
    });
    return adModel;
  }
}
