import mongoose from "mongoose";
const { Schema } = mongoose;

const referralSchema = new Schema(
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

export interface IReferralModelProps {
  _id: string;
  userId: string;
  referrers: number;
  referees: number;
  referrerBalance: number;
  refereeBalance: number;
}

export const ReferralModel =
  mongoose.models.Referral || mongoose.model("Referral", referralSchema);
