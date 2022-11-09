import mongoose, { Model } from "mongoose";
const { Schema } = mongoose;

export interface IReferralModel {
  _id: string;
  userId: string;
  referrers: number;
  referees: number;
  referrerBalance: number;
  refereeBalance: number;
}

const referralSchema = new Schema<IReferralModel>(
  {
    _id: { type: String, required: true },
    userId: { type: String, required: true },
    referrers: { type: Number, default: 0 },
    referees: { type: Number, default: 0 },
    referrerBalance: { type: Number, default: 0 },
    refereeBalance: { type: Number, default: 0 },
  },
  { _id: false }
);


export const ReferralModel: Model<IReferralModel> =
  mongoose.models.Referral || mongoose.model("Referral", referralSchema);
