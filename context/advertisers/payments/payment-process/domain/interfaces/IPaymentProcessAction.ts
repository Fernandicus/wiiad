import { IActionReducer } from "@/context/common/domain/interface/IActionReducer";
import { IStoreAdToLaunchState, IStoreBudgetDetailsState, IStorePaymentMethodState } from "./IPaymentProcessState";

export interface IStoreBudgetDetailsAction extends IActionReducer<IStoreBudgetDetailsState>{}
export interface IRemoveBudgetDetailsAction extends IActionReducer<undefined>{}
export interface IStorePaymentMethodAction extends IActionReducer<IStorePaymentMethodState>{}
export interface IStoreAdToLaunchAction extends IActionReducer<IStoreAdToLaunchState>{}