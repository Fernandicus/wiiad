import { IAdvertiserStatusState } from "./IAdvertiserStatusState";

export interface IAdvertiserStatusAction {
  type: string;
  payload: IAdvertiserStatusState;
}
