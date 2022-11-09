import mongoose, { Model } from "mongoose";
const { Schema } = mongoose;

export interface IVerificationEmailModel {
  _id: string;
  expirationDate: Date;
  email: string;
  role: string;
}

const verificationEmailSchema = new Schema<IVerificationEmailModel>(
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
    role: {
      type: String,
      required: true,
    },
  },
  { _id: false }
);

export const VerificationEmailModel: Model<IVerificationEmailModel> =
  mongoose.models.Verification_Email ||
  mongoose.model("Verification_Email", verificationEmailSchema);
