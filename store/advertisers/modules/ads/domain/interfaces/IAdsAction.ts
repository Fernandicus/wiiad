import { IAdsState } from "./IAdsState";

export interface IAdsAction {
  type: string;
  payload: IAdsState;
}
