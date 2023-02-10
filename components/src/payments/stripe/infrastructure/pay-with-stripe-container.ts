import { ApiCallGetCardDetails } from "../use-case/ApiCallGetCardDetails";
import { ApiCallGetCardDetailsHandler } from "../use-case/handler/ApiCallGetCardDetailsHandler";
import { PayWithStripeHandler } from "../use-case/handler/PayWithStripeHandler";
import { SaveNewStripePaymentMethodHandler } from "../use-case/handler/SaveNewStripePaymentMethodHandler";
import { SetupIntentClientSecretHandler } from "../use-case/handler/SetupIntentClientSecretHandler";
import { PayWithStripe } from "../use-case/PayWithStripe";
import { SaveNewStripePaymentMethod } from "../use-case/SaveNewStripePaymentMethod";
import { SetupIntentClientSecret } from "../use-case/SetupIntentClientSecret";
import { FetchStripeApiCalls } from "./FetchStripeApiCalls";

const fetchStripe = new FetchStripeApiCalls();
const payWithStripe = new PayWithStripe(fetchStripe);
export const payWithStripeHandler = new PayWithStripeHandler(payWithStripe);
const setupIntent = new SetupIntentClientSecret(fetchStripe);
export const setupIntentClientHandler = new SetupIntentClientSecretHandler(setupIntent);
const saveNewPM = new SaveNewStripePaymentMethod(fetchStripe);
export const saveNewPMHandler = new SaveNewStripePaymentMethodHandler(saveNewPM);
const getCardDetails = new ApiCallGetCardDetails(fetchStripe);
export const getCardDetailsHandler = new ApiCallGetCardDetailsHandler(getCardDetails);
