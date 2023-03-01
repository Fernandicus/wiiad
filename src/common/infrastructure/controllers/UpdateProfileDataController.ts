import { sendVerificationEmailHandler } from "@/src/modules/mailing/send-email-verification/infrastructure/email-verification-container";
import { IReqAndRes } from "@/src/modules/session/domain/interfaces/IAuthCookies";
import { userSession } from "@/src/modules/session/infrastructure/session-container";
import {
  findAdvertiserHandler,
  findUserHandler,
  updateUserHandler,
} from "@/src/modules/users/user/container";
import { IUserPrimitives } from "@/src/modules/users/user/domain/User";
import { FindAdvertiserHandler } from "@/src/modules/users/user/handler/FindAdvertiserHandler";
import { FindUserHandler } from "@/src/modules/users/user/handler/FindUserHandler";
import { IUpdateHandlerProps } from "@/src/modules/users/user/handler/UpdateUserHandler";
import { ErrorUpdatingProfile } from "../../domain/errors/ErrorUpdatingProfile";
import { Maybe } from "../../domain/Maybe";

export interface IUpdateProfileProps extends IUpdateHandlerProps {
  email?: string;
}

type UpdateProfileProps = {
  user: IUserPrimitives;
  updateData: IUpdateProfileProps;
  ctx: IReqAndRes;
};

export class UpdateProfileDataController {
  async updateAdvertiserProfile(params: UpdateProfileProps): Promise<void> {
    const { user, updateData } = params;
    const newEmail = updateData.email;
    const emailHasChanged = newEmail && newEmail.toLowerCase() !== user.email;

    if (emailHasChanged) {
      const advertiserFound = await findUserHandler.byEmail(newEmail);
      await this.sendVerificationEmail(advertiserFound, { newEmail, user });
    }

    await this.verifyName({ ...params, finder: findUserHandler });
  }

  async updateUserProfile(params: UpdateProfileProps): Promise<void> {
    const { user, updateData } = params;
    const newEmail = updateData.email;
    const emailHasChanged = newEmail && newEmail.toLowerCase() !== user.email;

    if (emailHasChanged) {
      const advertiserFound = await findAdvertiserHandler.byEmail(newEmail);
      await this.sendVerificationEmail(advertiserFound, { newEmail, user });
    }

    await this.verifyName({ ...params, finder: findAdvertiserHandler });
  }

  private async sendVerificationEmail(
    maybeUser: Maybe<IUserPrimitives>,
    data: {
      user: IUserPrimitives;
      newEmail: string;
    }
  ) {
    const { newEmail, user } = data;
    await maybeUser.match({
      some(_) {
        throw ErrorUpdatingProfile.emailAlreadyExist(newEmail);
      },
      nothing: async () => {
        await sendVerificationEmailHandler.sendUpdate({
          sendTo: newEmail,
          payload: { email: newEmail, id: user.id, role: user.role },
        });
      },
    });
  }

  private async verifyName(
    props: UpdateProfileProps & {
      finder: FindUserHandler | FindAdvertiserHandler;
    }
  ) {
    const { updateData, user, finder } = props;
    const newName = updateData.name;
    const nameHasChanged = newName && newName !== user.name;
    if (nameHasChanged) {
      const userFound = await finder.byName(newName);
      await this.updateNewName({
        ...props,
        userFound,
      });
    } else {
      await this.updateProfile(props);
    }
  }

  private async updateNewName(
    params: UpdateProfileProps & {
      userFound: Maybe<IUserPrimitives>;
    }
  ) {
    const { userFound, updateData } = params;
    await userFound.match({
      some(_) {
        throw ErrorUpdatingProfile.nameAlreadyExist(updateData.name!);
      },
      nothing: async () => {
        await this.updateProfile(params);
      },
    });
  }

  private async updateProfile(params: UpdateProfileProps) {
    const { ctx, updateData, user } = params;
    const newUser = this.parseNewData(user, updateData);
    await updateUserHandler.profile({
      userId: newUser.id,
      data: newUser,
    });
    userSession.setFromServer(ctx, newUser);
  }

  private parseNewData(
    user: IUserPrimitives,
    data: IUpdateProfileProps
  ): IUserPrimitives {
    const { name, profilePic } = data;
    return {
      ...user,
      name: this.compareDataToUpdate(user.name, name),
      profilePic: this.compareDataToUpdate(user.profilePic, profilePic),
    };
  }

  private compareDataToUpdate(actualData: string, dataToUpdate?: string) {
    if (!dataToUpdate) return actualData;
    return actualData === dataToUpdate ? actualData : dataToUpdate;
  }
}
