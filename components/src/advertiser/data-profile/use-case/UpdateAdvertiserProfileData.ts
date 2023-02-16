import { Email } from "@/src/common/domain/Email";
import { IAdvertiserData } from "@/src/common/domain/interfaces/IAdvertiserData";
import { Name } from "@/src/common/domain/Name";
import { ProfilePic } from "@/src/common/domain/ProfilePic";
import {
  IAdvertiserApiCall,
} from "../domain/interfaces/IAdvertiserApiCall";

export interface IUpdateProfileDataProps {
  email?: Email;
  name?: Name;
  profilePic?: ProfilePic;
}

export class UpdateAdvertiserProfileData {
  constructor(private apiCall: IAdvertiserApiCall) {}

  async update(props: IUpdateProfileDataProps): Promise<void> {
    await this.apiCall.updateProfileData(props);
  }
}
