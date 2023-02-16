import { AdPropsPrimitives } from "@/src/modules/ad/domain/Ad";
import { adFinderHandler } from "@/src/modules/ad/infraestructure/ad-container";
import { ICampaignPrimitives } from "@/src/modules/campaign/domain/Campaign";
import { findCampaignHandler } from "@/src/modules/campaign/infrastructure/campaign-container";
import { sendVerificationEmailHandler } from "@/src/modules/mailing/send-email-verification/infrastructure/email-verification-container";
import { IStripePrimitives } from "@/src/modules/payment-methods/stripe/domain/Stripe";
import { findCustomerHandler } from "@/src/modules/payment-methods/stripe/infrastructure/stripe-container";
import { IReqAndRes } from "@/src/modules/session/domain/interfaces/IAuthCookies";
import { userSession } from "@/src/modules/session/infrastructure/session-container";
import { updateDataHandler } from "@/src/modules/users/user/container";
import { IUserPrimitives } from "@/src/modules/users/user/domain/User";
import { IUpdateDataPrimitives } from "@/src/modules/users/user/handler/UpdateUserHandler";
import { UserMongoDBRepo } from "@/src/modules/users/user/infrastructure/UserMongoDBRepo";
import { UpdateUser } from "@/src/modules/users/user/use-case/UpdateUser";
import { UniqId } from "@/src/utils/UniqId";
import { IAdvertiserDataPrimitives } from "../../domain/interfaces/IAdvertiserData";

type TUpdateProfileCtrProps = IUpdateDataPrimitives & { email?: string };

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

  async updateProfile(params: {
    session: IUserPrimitives;
    update: TUpdateProfileCtrProps;
    ctx: IReqAndRes;
  }): Promise<void> {
    const session = params.session;
    const context = params.ctx;
    const email = params.update.email;

    //// Send verfication email before update de email
    //TODO: Handle update email
    if (email && email.toLowerCase() !== session.email) {
      await sendVerificationEmailHandler.sendUpdate({
        sendTo: email,
        payload: { email },
      });
    }

    const newData = this.getNewData(session, params.update);

    await updateDataHandler.update({
      userId: session.id,
      data: newData,
    });

    userSession.setFromServer(context, newData);
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
