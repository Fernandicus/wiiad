import mongoose, { Model } from "mongoose";
import { AdDescription } from "../domain/value-objects/AdDescription";
import { AdTitle } from "../domain/value-objects/AdTitle";
const { Schema } = mongoose;

export interface AdModelProps {
  _id: string;
  advertiserId: string;
  title: string;
  description: string;
  file: string;
  redirectionUrl: string;
  segments: string[];
}

const adSchema = new Schema<AdModelProps>(
  {
    _id: { type: String, required: true },
    advertiserId: { type: String, required: true },
    title: {
      type: String,
      required: true,
      min: 1,
      max: AdTitle.maxLength,
    },
    description: {
      type: String,
      required: true,
      min: 1,
      max: AdDescription.maxLength,
    },
    file: { type: String, required: true },
    redirectionUrl: { type: String, required: true },
    segments: [{ type: String }],
  },
  { _id: false }
);

export const AdModel: Model<AdModelProps> =
  mongoose.models.Ad || mongoose.model("Ad", adSchema);
