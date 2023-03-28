import { Email } from "@/src/common/domain/Email";
import { Name } from "@/src/common/domain/Name";
import { ProfilePic } from "@/src/common/domain/ProfilePic";
import { UniqId } from "@/src/common/domain/UniqId";
import { IUserRepo } from "../domain/IUserRepo";
import { IUpdateData, UpdateUser } from "../use-case/UpdateUser";

export interface IUpdateHandlerProps {
  name?: string;
  profilePic?: string;
}

interface IUpdateProfileHandlerPrimitives {
  userId: string;
  data: IUpdateHandlerProps;
}

export class UpdateUserHandler {
  constructor(private updateUser: UpdateUser) {}

  async profile(params: IUpdateProfileHandlerPrimitives): Promise<void> {
    const { data, userId } = params;
    const id = new UniqId(userId);
    await this.updateUser.profile({
      userId: id,
      data: this.getData(data),
    });
  }

  async email(params: { id: string; newEmail: string }): Promise<void> {
    const { newEmail, id } = params;
    const userId = new UniqId(id);
    const userEmail = new Email(newEmail);
    await this.updateUser.email({ newEmail: userEmail, id: userId });
  }

  private getData(data: IUpdateHandlerProps): IUpdateData {
    const name = data.name ? new Name(data.name) : undefined;
    const profilePic = data.profilePic
      ? new ProfilePic(data.profilePic)
      : undefined;
    return {
      name,
      profilePic,
    };
  }
}
