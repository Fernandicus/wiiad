import { IPaymentProcessState } from "./IPaymentProcessState";

export interface IPaymentProcessContext<T> {
    paymentProcess: T;
  }

export interface IPaymentProcessCtxState extends IPaymentProcessContext<IPaymentProcessState>{}