import { IPaymentProcessState } from "./interfaces/IPaymentProcessState";

export const paymentProcessInitialState: IPaymentProcessState = {
  budget: {
    amount: 0,
    clicks: 0,
    pricePerClick: 0,
  },
  paymentMethod: "",
  ad: {
    advertiserId: "",
    description: "",
    file: "",
    id: "",
    redirectionUrl: "",
    segments: [],
    title: "",
  },
};
