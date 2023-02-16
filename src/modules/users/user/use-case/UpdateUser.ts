import { Name } from "@/src/common/domain/Name";
import { ProfilePic } from "@/src/common/domain/ProfilePic";
import { UniqId } from "@/src/utils/UniqId";
import { IUserRepo } from "../domain/IUserRepo";

export interface IUpdateData {
  // email?: Email;
  name?: Name;
  profilePic?: ProfilePic;
}

export interface IUpdateProfileProps {
  userId: UniqId;
  data: IUpdateData;
}

export class UpdateUser {
  constructor(private repo: IUserRepo) {}

  async update(params: IUpdateProfileProps): Promise<void> {
    await this.repo.update(params);
  }
}
