import { AdPropsPrimitives } from "@/src/modules/ad/domain/Ad";
import { adFinderHandler } from "@/src/modules/ad/infraestructure/ad-container";
import { ICampaignPrimitives } from "@/src/modules/campaign/domain/Campaign";
import { findCampaignHandler } from "@/src/modules/campaign/infrastructure/campaign-container";
import { sendVerificationEmailHandler } from "@/src/modules/mailing/send-email-verification/infrastructure/email-verification-container";
import { IStripePrimitives } from "@/src/modules/payment-methods/stripe/domain/Stripe";
import { findCustomerHandler } from "@/src/modules/payment-methods/stripe/infrastructure/stripe-container";
import { IReqAndRes } from "@/src/modules/session/domain/interfaces/IAuthCookies";
import { userSession } from "@/src/modules/session/infrastructure/session-container";
import {
  findAdvertiserHandler,
  updateUser,
  updateUserHandler,
} from "@/src/modules/users/user/container";
import { IUserPrimitives, User } from "@/src/modules/users/user/domain/User";
import { IUpdateHandlerProps } from "@/src/modules/users/user/handler/UpdateUserHandler";
import { ErrorUpdatingProfile } from "../../domain/errors/ErrorUpdatingProfile";
import { IAdvertiserDataPrimitives } from "../../domain/interfaces/IAdvertiserData";
import { Name } from "../../domain/Name";
import { ProfilePic } from "../../domain/ProfilePic";

export interface IUpdateProfileProps extends IUpdateHandlerProps {
  email?: string;
}

type TUpdateProfileProps = {
  user: IUserPrimitives;
  update: IUpdateProfileProps;
  ctx: IReqAndRes;
};

export class AdvertiserProfileDataController {
  constructor() {}

  async getAdvertiserData(
    advertiserId: string
  ): Promise<IAdvertiserDataPrimitives> {
    const findCampaigns = findCampaignHandler.byAdvertiserId(advertiserId);
    const findAds = adFinderHandler.findAll(advertiserId);
    const findStripeCustomer = findCustomerHandler.ByUserId(advertiserId);

    const [campaignsResp, adsResp, stripeCustomerResp] =
      await Promise.allSettled([findCampaigns, findAds, findStripeCustomer]);

    const campaigns = this.getValueArray(campaignsResp);
    const ads = this.getValueArray(adsResp);
    const stripeCustomer = this.getValue(stripeCustomerResp);

    return { campaigns, ads, stripeCustomer };
  }

  async updateAdvertiserProfile(params: TUpdateProfileProps): Promise<void> {
    const { user, ctx, update } = params;
    const newName = update.name;
    const newEmail = update.email;
    const emailHasChanged = newEmail && newEmail.toLowerCase() !== user.email;
    const nameHasChanged = newName && newName !== user.name;

    if (emailHasChanged) await this.verifyAndValidateEmail({ user, newEmail });

    if (nameHasChanged)
      await this.verifyAndUpdateProfile({ ctx, newName, update, user });
  }

  private async verifyAndValidateEmail(params: {
    user: IUserPrimitives;
    newEmail: string;
  }) {
    const { newEmail, user } = params;
    const advertiserFound = await findAdvertiserHandler.byEmail(newEmail);
    advertiserFound.match({
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

  private async verifyAndUpdateProfile(params: {
    ctx: IReqAndRes;
    newName: string;
    user: IUserPrimitives;
    update: IUpdateProfileProps;
  }) {
    const { ctx, newName, update, user } = params;
    const nameFound = await findAdvertiserHandler.byName(newName);
    await nameFound.match({
      some(_) {
        throw ErrorUpdatingProfile.nameAlreadyExist(newName);
      },
      nothing: async () => {
        const newData = this.getNewData(user, update);
        await updateUserHandler.profile({
          userId: user.id,
          data: newData,
        });
        userSession.setFromServer(ctx, newData);
      },
    });
  }

  private getNewData(
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

  private getValueArray<T>(resp: PromiseSettledResult<T[]>): T[] {
    return resp.status == "rejected" ? [] : resp.value;
  }

  private getValue<T>(resp: PromiseSettledResult<T>): T | undefined {
    return resp.status === "rejected" ? undefined : resp.value;
  }
}
