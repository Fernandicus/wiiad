import mongoose from "mongoose";
const { Schema } = mongoose;

const verificationEmailSchema = new Schema(
  {
    _id: { type: String, required: true },
    expirationDate: {
      type: Date,
      required: true,
    },
    email: {
      type: String,
      required: true,
      match: /.+\@.+\..+/,
    },
    rol: {
      type: String,
      required: true,
    },
  },
  { _id: false }
);

export interface VerificationEmailModelProps {
  _id: string;
  expirationDate: Date;
  email: string;
  rol: string;
}

export const VerificationEmailModel = mongoose.models.Verification_Email || mongoose.model(
  "Verification_Email",
  verificationEmailSchema
);
