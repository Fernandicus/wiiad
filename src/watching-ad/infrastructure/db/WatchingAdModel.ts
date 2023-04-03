import { model, Model, Schema } from "mongoose";
import { models } from "mongoose";

export interface IWatchingAdModel {
  _id: string;
  creationDate: Date,
  refereeId: string;
  referrerId: string;
  campaignId: string;
  duration: number;
  startedAt?: Date;
}

const watchingAdSchema = new Schema<IWatchingAdModel>(
  {
    _id: { type: String, required: true },
    creationDate: {type: Date, required: true},
    refereeId: { type: String, required: true },
    referrerId: { type: String, required: true },
    campaignId: { type: String, required: true },
    duration: { type: Number, required: true },
    startedAt: { type: Date },
  },
  { _id: false }
);

export const WatchingAdModel: Model<IWatchingAdModel> =
  models.WatchingAd || model("WatchingAd", watchingAdSchema);
