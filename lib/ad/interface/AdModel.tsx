import mongoose from "mongoose";
import { AdConstants } from "../ad-constants";
const { Schema } = mongoose;

const adSchema = new Schema({
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
});

export const AdModel = mongoose.model("AdModel", adSchema);
