import mongoose from "mongoose";
const { Schema } = mongoose;

const verificationTokenSchema = new Schema(
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

export interface VerificationTokenModelProps {
  _id: string;
  expirationDate: Date;
  email: string;
}

export const VerificationTokenModel = mongoose.model(
  "Verification_Token",
  verificationTokenSchema
);
