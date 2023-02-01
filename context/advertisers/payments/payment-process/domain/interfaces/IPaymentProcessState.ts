import { AdPropsPrimitives } from "@/src/modules/ad/domain/Ad";

export interface IPaymentProcessState extends IStoreBudgetDetailsState, IStorePaymentMethodState, IStoreAdToLaunchState{}

export interface IStoreBudgetDetailsState {
  budget: { amount: number; clicks: number; pricePerClick: number };
}

export interface IStorePaymentMethodState {
  paymentMethod: string;
}

export interface IStoreAdToLaunchState {
  ad: AdPropsPrimitives;
}
