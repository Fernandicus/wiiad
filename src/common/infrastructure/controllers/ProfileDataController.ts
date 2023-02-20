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
  updateUserHandler,
} from "@/src/modules/users/user/container";
import { IUserPrimitives } from "@/src/modules/users/user/domain/User";
import { IUpdateDataPrimitives } from "@/src/modules/users/user/handler/UpdateUserHandler";
import { ErrorUpdatingProfile } from "../../domain/errors/ErrorUpdatingProfile";
import { IAdvertiserDataPrimitives } from "../../domain/interfaces/IAdvertiserData";

type TUpdateProps = IUpdateDataPrimitives & { email?: string };
type TUpdateProfileProps = {
  session: IUserPrimitives;
  update: TUpdateProps;
  ctx: IReqAndRes;
};

export class ProfileDataController {
  constructor() {}

  async getAdvertiserData(
    advertiserId: string
  ): Promise<IAdvertiserDataPrimitives> {
    const findCampaigns = findCampaignHandler.byAdvertiserId(advertiserId);
    const findAds = adFinderHandler.findAll(advertiserId);
    const findStripeCustomer = findCustomerHandler.ByUserId(advertiserId);

    const response = await Promise.allSettled([
      findCampaigns,
      findAds,
      findStripeCustomer,
    ]);

    const campaigns = this.getValueArray(response[0]);
    const ads = this.getValueArray(response[1]);
    const stripeCustomer = this.getValue(response[2]);

    return { campaigns, ads, stripeCustomer };
  }

  async updateAdvertiserProfile(params: TUpdateProfileProps): Promise<void> {
    const { session, ctx, update } = params;
    const newName = update.name;
    const newEmail = update.email;
    const emailHasChanged =
      newEmail && newEmail.toLowerCase() !== session.email;
    const nameHasChanged = newName && newName !== session.name;
    //// Send verfication email before update de email
    //TODO: Handle update email
    if (emailHasChanged) {
      const advertiserFound = await findAdvertiserHandler.byEmail(newEmail);
      advertiserFound.match({
        some(_) {
          throw ErrorUpdatingProfile.emailAlreadyExist(newEmail);
        },
        nothing: async () => {
          await sendVerificationEmailHandler.sendUpdate({
            sendTo: newEmail,
            payload: { email: newEmail, id: session.id },
          });
        },
      });
    }

    if (nameHasChanged) {
      const nameFound = await findAdvertiserHandler.byName(newName);
      nameFound.match({
        some(_) {
          throw ErrorUpdatingProfile.nameAlreadyExist(newName);
        },
        nothing: async () => {
          const newData = this.getNewData(session, update);
          await updateUserHandler.profile({
            userId: session.id,
            data: newData,
          });
          userSession.setFromServer(ctx, newData);
        },
      });
    }
  }

  private getNewData(
    session: IUserPrimitives,
    data: IUpdateDataPrimitives
  ): IUserPrimitives {
    const { name, profilePic } = data;
    return {
      ...session,
      name: this.compareDataToUpdate(session.name, name),
      profilePic: this.compareDataToUpdate(session.profilePic, profilePic),
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
