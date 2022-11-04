import mongoose from "mongoose";
import { AdDescription } from "../domain/value-objects/AdDescription";
import { AdTitle } from "../domain/value-objects/AdTitle";
const { Schema } = mongoose;

const adSchema = new Schema(
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
    image: { type: String, required: true },
    redirectionUrl: { type: String, required: true },
    segments: { type: Array, required: true },
  },
  { _id: false }
);

export interface AdModelProps {
  _id: string;
  advertiserId: string;
  title: string;
  description: string;
  image: string;
  redirectionUrl: string;
  segments: string[];
}

export const AdModel = mongoose.models.Ad || mongoose.model("Ad", adSchema);
