import { IActionReducer } from "@/context/common/domain/interface/IActionReducer";
import { INotificationState } from "./INotificationState";


export interface IStoreNotificationAction extends IActionReducer<INotificationState>{}
export interface IRemoveNotificationAction extends IActionReducer<undefined>{}