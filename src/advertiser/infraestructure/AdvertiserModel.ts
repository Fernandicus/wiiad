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
    rol: {
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
  rol: string;
}

export const AdvertiserModel = mongoose.model("Advertiser", advertiserSchema);
