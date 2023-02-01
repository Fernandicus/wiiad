import { PayWithStripeHandler } from "../use-case/handler/PayWithStripeHandler";
import { PayWithStripe } from "../use-case/PayWithStripe";
import { FetchStripeApiCalls } from "./FetchStripeApiCalls";

const fetchStripe = new FetchStripeApiCalls();
const payWithStripe = new PayWithStripe(fetchStripe);
export const payWithStripeHandler = new PayWithStripeHandler(payWithStripe);
