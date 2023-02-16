import { Email } from "@/src/common/domain/Email";
import { Name } from "@/src/common/domain/Name";
import { ProfilePic } from "@/src/common/domain/ProfilePic";
import { UniqId } from "@/src/utils/UniqId";
import {  IUserRepo } from "../domain/IUserRepo";
import { IUpdateData, UpdateUser } from "../use-case/UpdateUser";

export interface IUpdateDataPrimitives {
  name?: string;
  profilePic?: string;
}

interface IUpdateProfilePropsPrimitives {
  userId: string;
  data: IUpdateDataPrimitives;
}

export class UpdateUserHandler {
  constructor(private updateUser: UpdateUser) {}

  async update(params: IUpdateProfilePropsPrimitives): Promise<void> {
    const { data, userId } = params;
    const id = new UniqId(userId);
    await this.updateUser.update({
      userId: id,
      data: this.getData(data),
    });
  }

  private getData(data: IUpdateDataPrimitives): IUpdateData {
    const name = data.name ? new Name(data.name) : undefined;
   // const email = data.email ? new Email(data.email) : undefined;
    const profilePic = data.profilePic ? new ProfilePic(data.profilePic) : undefined;
    return {
      name,
    //  email,
      profilePic,
    };
  }
}
