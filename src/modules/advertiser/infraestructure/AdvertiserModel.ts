import mongoose from "mongoose";
const { Schema } = mongoose;

const advertiserSchema = new Schema(
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
  },
  { _id: false }
);

export interface AdvertiserModelProps {
  _id: string;
  name: string;
  email: string;
  role: string;
}

export const AdvertiserModel = mongoose.models.Advertiser || mongoose.model("Advertiser", advertiserSchema);
