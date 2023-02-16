import { IAdvertiserData } from "@/src/common/domain/interfaces/IAdvertiserData";
import { IUpdateProfileDataProps } from "../../use-case/UpdateAdvertiserProfileData";

export interface IAdvertiserApiCall {
  getAdvertiserProfileData(): Promise<IAdvertiserData>;
  updateProfileData(props: IUpdateProfileDataProps): Promise<void>;
}
