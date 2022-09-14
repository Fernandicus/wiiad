import { Ad } from "../domain/Ad";
import {Repository} from "../domain/Repository";
import { AdModel } from "./AdModel";

export class AdMongoDBRepository implements Repository {
  constructor() {
    const mongoDBUrl: string = process.env.MONGODB_URL ?? "";
  }

  async save(ad: Ad): Promise<void> {
    const title = ad.title.title;
    const description = ad.description.description;
    const image = ad.image.image;
    const redirectionUrl = ad.redirectionUrl.url

    const adModel = new AdModel({title, description, image, redirectionUrl});

    await adModel.save();
  }
}
