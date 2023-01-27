import { IStripeState } from "./interfaces/IStripeState";

export const initStripeState: IStripeState = {
  stripe: {
    id: "",
    userId: "",
    customerId: "",
    paymentMethods: [],
  },
};
