import { Email } from "@/src/common/domain/Email";
import { Name } from "@/src/common/domain/Name";
import { ProfilePic } from "@/src/common/domain/ProfilePic";
import { UniqId } from "@/src/utils/UniqId";
import { IUserRepo } from "../domain/IUserRepo";

export interface IUpdateData {
  name?: Name;
  profilePic?: ProfilePic;
}

export interface IUpdateProfileProps {
  userId: UniqId;
  data: IUpdateData;
}

export class UpdateUser {
  constructor(private repo: IUserRepo) {}

  async profile(params: IUpdateProfileProps): Promise<void> {
    await this.repo.updateProfile(params);
  }

  async email(params: { id: UniqId; email: Email }): Promise<void> {
    const { email, id } = params;
    await this.repo.updateEmail({ id, email });
  }
}
