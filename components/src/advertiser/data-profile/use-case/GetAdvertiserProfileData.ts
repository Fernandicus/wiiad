import { IAdvertiserData } from "@/src/common/domain/interfaces/IAdvertiserData";
import { IAdvertiserApiCall } from "../domain/interfaces/IAdvertiserApiCall";

export class GetAdvertiserProfileData {
  constructor(private apiCall: IAdvertiserApiCall) {}

  async getData(): Promise<IAdvertiserData> {
    const advertiserData = await this.apiCall.getAdvertiserProfileData();
    return advertiserData;
  }
}
