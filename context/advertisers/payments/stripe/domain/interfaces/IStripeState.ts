import { IStripePrimitives } from "@/src/modules/payment-methods/stripe/domain/Stripe";

export interface IStripeState{
    stripe: IStripePrimitives,
}