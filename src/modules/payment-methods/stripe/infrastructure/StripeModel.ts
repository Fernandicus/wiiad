import mongoose, { Model, Schema } from "mongoose";
import { ICardDetailsPrimitives } from "../domain/CardDetails";

const cardDetailsSchema = new Schema<ICardDetailsPrimitives>(
  {
    paymentMethodId: { type: String, required: true },
    brand: { type: String, required: true },
    expMonth: { type: Number, required: true },
    expYear: { type: Number, required: true },
    last4: { type: String, required: true, maxlength: 4 },
  },
  { _id: false }
);

export interface IStripeModel {
  _id: string;
  userId: string;
  customerId: string;
  paymentMethods: ICardDetailsPrimitives[];
}

const stripeSchema = new Schema<IStripeModel>(
  {
    _id: { type: String, required: true },
    userId: { type: String, required: true },
    customerId: { type: String, required: true },
    paymentMethods: [{ type: Schema.Types.Mixed, of: cardDetailsSchema }],
  },
  { _id: false }
);

export const StripeModel: Model<IStripeModel> =
  mongoose.models.StripeModel || mongoose.model("StripeModel", stripeSchema);
