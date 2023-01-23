import { IAdvertiserData } from "@/src/common/domain/interfaces/IAdvertiserData";

export interface IAdvertiserApiCall {
  getAdvertiserProfileData(): Promise<IAdvertiserData>;
}
