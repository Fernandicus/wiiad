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
  },
  { _id: false }
);

export interface VerificationEmailModelProps {
  _id: string;
  expirationDate: Date;
  email: string;
}

export const VerificationEmailModel = mongoose.model(
  "Verification_Email",
  verificationEmailSchema
);
