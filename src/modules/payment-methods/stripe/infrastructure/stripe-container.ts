import { SaveStripeHandler } from "../use-case/handlers/SaveStripeHandler";
import { FindStripeCustomerHandler } from "../use-case/handlers/FindStripeCustomerHandler";
import { StripeMongoDBRepo } from "./db/StripeMongoDBRepo";
import { FindStripeCustomer } from "../use-case/FindStripeCustomer";
import { SaveStripe } from "../use-case/SaveStripe";
import { PaymentIntent } from "../use-case/PaymentIntent";
import { StripePayments } from "./StripePayments";
import { PaymentIntentHandler } from "../use-case/handlers/PaymentIntentHandler";
import { UpdateStripe } from "../use-case/UpdateStripe";
import { UpdateStripeHandler } from "../use-case/handlers/UpdateStripeHandler";
import { GetPaymentDetailsHandler } from "../use-case/handlers/GetPaymentDetailsHandler";
import { GetPaymentDetails } from "../use-case/GetPaymentDetails";
import { CreateStripeCustomer } from "../use-case/CreateStripeCustomer";
import { CreateStripeCustomerHandler } from "../use-case/handlers/CreateStripeCustomerHandler";
import Stripe from "stripe";
import { PaymentSucceeded } from "../use-case/PaymentSucceeded";
import { SetupIntent } from "../use-case/SetupIntent";
import { SetupIntentHandler } from "../use-case/handlers/SetupIntentHandler";

export const stripeRepo = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2022-08-01",
});

const stripeMongoRepo = new StripeMongoDBRepo();
const stripePayments = new StripePayments(stripeRepo);
const saveStripe = new SaveStripe(stripeMongoRepo);
const findStripe = new FindStripeCustomer(stripeMongoRepo);
const paymentIntent = new PaymentIntent(stripePayments);
const updateStripe = new UpdateStripe(stripeMongoRepo);
const getDetails = new GetPaymentDetails(stripePayments);
const createStripeCustomer = new CreateStripeCustomer(stripePayments);
export const paymentSucceeded = new PaymentSucceeded(stripePayments);

export const saveStripeHandler = new SaveStripeHandler(saveStripe);
export const findCustomerHandler = new FindStripeCustomerHandler(findStripe);
export const paymentIntentHandler = new PaymentIntentHandler(paymentIntent);
export const updateStripeHandler = new UpdateStripeHandler(updateStripe);
export const getPaymentDetailsHandler = new GetPaymentDetailsHandler(
  getDetails
);
export const createStripeCustomerHandler = new CreateStripeCustomerHandler(
  createStripeCustomer
);
const setupIntent = new SetupIntent(stripePayments);
export const setupIntentHandler = new SetupIntentHandler(setupIntent);