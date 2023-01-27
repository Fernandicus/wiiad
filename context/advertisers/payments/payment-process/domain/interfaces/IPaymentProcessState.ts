export interface IPaymentProcessState extends IStoreBudgetDetailsState, IStorePaymentMethodState{}

export interface IStoreBudgetDetailsState {
  budget: { amount: number; clicks: number; pricePerClick: number };
}

export interface IStorePaymentMethodState {
  paymentMethod: string;
}
