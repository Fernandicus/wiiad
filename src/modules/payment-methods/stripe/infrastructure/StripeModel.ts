import mongoose, { Model, Schema } from "mongoose";

export interface IStripeModel {
  _id: string;
  userId: string;
  customerId: string;
  paymentMethods: string[];
}

const stripeSchema = new Schema<IStripeModel>(
  {
    _id: { type: String, required: true },
    userId: { type: String, required: true },
    customerId: { type: String, required: true },
    paymentMethods: [String],
  },
  { _id: false }
);

export const StripeModel: Model<IStripeModel> =
  mongoose.models.StripeModel || mongoose.model("StripeModel", stripeSchema);
