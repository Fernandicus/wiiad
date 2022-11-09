import mongoose, { Model } from "mongoose";
const { Schema } = mongoose;

export interface IAdvertiserModel {
  _id: string;
  name: string;
  email: string;
  role: string;
  profilePic: string;
}

const advertiserSchema = new Schema<IAdvertiserModel>(
  {
    _id: { type: String, required: true },
    name: {
      type: String,
      required: true,
      min: 1,
    },
    email: {
      type: String,
      required: true,
      min: 1,
    },
    role: {
      type: String,
      required: true,
      min: 1,
    },
    profilePic: {
      type: String,
      required: true,
    },
  },
  { _id: false }
);

export const AdvertiserModel: Model<IAdvertiserModel> =
  mongoose.models.Advertiser || mongoose.model("Advertiser", advertiserSchema);
