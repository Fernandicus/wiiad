import { Email } from "@/src/common/domain/Email";
import { Name } from "@/src/common/domain/Name";
import { ProfilePic } from "@/src/common/domain/ProfilePic";
import { UniqId } from "@/src/common/domain/UniqId";
import { IUserRepo } from "../domain/IUserRepo";

export interface IUpdateData {
  name?: Name;
  profilePic?: ProfilePic;
}

export interface IUpdateUserProfileProps {
  userId: UniqId;
  data: IUpdateData;
}

export class UpdateUser {
  constructor(private repo: IUserRepo) {}

  async profile(params: IUpdateUserProfileProps): Promise<void> {
    await this.repo.updateProfile(params);
  }

  async email(params: { id: UniqId; newEmail: Email }): Promise<void> {
    const { newEmail, id } = params;
    await this.repo.updateEmail({ id, newEmail });
  }
}
