import mongoose from "mongoose";
import { AdConstants } from "../ad-constants";
const { Schema } = mongoose;

const adSchema = new Schema({
  advertiserId: { type: Schema.Types.ObjectId, required: true },
  title: {
    type: String,
    required: true,
    min: 1,
    max: AdConstants.titleMaxLength,
  },
  description: {
    type: String,
    required: true,
    min: 1,
    max: AdConstants.titleMaxLength,
  },
  image: { type: String, required: true },
  redirectionUrl: { type: String, required: true },
  segments: { type: Array, required: true },
});

export interface AdModelProps {
  advertiserId: mongoose.Types.ObjectId,
  title: string,
  description: string
  image: string
  redirectionUrl: string
  segments: string[]
}

export const AdModel = mongoose.model("Ad", adSchema);
