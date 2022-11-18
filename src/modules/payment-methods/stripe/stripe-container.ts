import { SaveStripeCustomerHandler } from "./handler/SaveStripeCustomerHandler";
import { FindStripeCustomerHandler } from "./handler/FindStripeCustomerHandler";
import { StripeMongoDBRepo } from "./infrastructure/StripeMongoDBRepo";
import { FindStripeCustomer } from "./use-case/FindStripeCustomer";
import { SaveStripeCustomer } from "./use-case/SaveStripeCustomer";
import { PaymentIntent } from "./use-case/PaymentIntent";
import StripePayment from "@/pages/payment";
import { StripePayments } from "./infrastructure/StripePayments";
import { PaymentIntentHandler } from "./handler/PaymentIntentHandler";
import { UpdateStripe } from "./use-case/UpdateStripe";
import { UpdateStripeHandler } from "./handler/UpdateStripeHandler";
import { GetPaymentDetailsHandler } from "./handler/GetPaymentDetailsHandler";
import { GetPaymentDetails } from "./use-case/GetPaymentDetails";

const stripeRepo = new StripeMongoDBRepo();
const stripePayments = new StripePayments();
const saveStripe = new SaveStripeCustomer(stripeRepo);
const findStripe = new FindStripeCustomer(stripeRepo);
const paymentIntent = new PaymentIntent(stripePayments);
const updateStripe = new UpdateStripe(stripeRepo);
const getDetails = new GetPaymentDetails(stripePayments);

export const saveCustomerHandler = new SaveStripeCustomerHandler(saveStripe);
export const findCustomerHandler = new FindStripeCustomerHandler(findStripe);
export const paymentIntentHandler = new PaymentIntentHandler(paymentIntent);
export const updateStripeHandler = new UpdateStripeHandler(updateStripe);
export const getPaymentDetailsHandler = new GetPaymentDetailsHandler(getDetails);