import mongoose, { Model } from "mongoose";

const { Schema } = mongoose;

export interface ICampaignModel {
  _id: string;
  advertiserId: string;
  adId: string;
  status: string;
  referrals: string[];
  budget: {
    balance: number;
    clicks: number;
  };
  metrics: {
    totalViews: number;
    totalClicks: number;
  };
}

const campaignSchema = new Schema<ICampaignModel>(
  {
    _id: { type: String, required: true },
    advertiserId: { type: String, required: true },
    adId: { type: String, required: true },
    status: { type: String, required: true },
    referrals: [String],
    budget: {
      balance: { type: Number, default: 0 },
      clicks: { type: Number, default: 0 },
    },
    metrics: {
      totalViews: { type: Number, default: 0 },
      totalClicks: { type: Number, default: 0 },
    },
  },
  { _id: false }
);

export const CampaignModel: Model<ICampaignModel> =
  mongoose.models.Campaign || mongoose.model("Campaign", campaignSchema);
