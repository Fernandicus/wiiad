import { IApiProfileResp } from "@/pages/api/v1/profile";
import { Balance } from "@/src/common/domain/Balance";
import {
  IAdvertiserData,
  IAdvertiserDataPrimitives,
} from "@/src/common/domain/interfaces/IAdvertiserData";
import { Ad, AdPropsPrimitives } from "@/src/modules/ad/domain/Ad";
import { AdDescription } from "@/src/modules/ad/domain/value-objects/AdDescription";
import { AdFileUrl } from "@/src/modules/ad/domain/value-objects/AdFileUrl";
import { AdRedirectionUrl } from "@/src/modules/ad/domain/value-objects/AdRedirectionUrl";
import { AdSegments } from "@/src/modules/ad/domain/value-objects/AdSegments";
import { AdTitle } from "@/src/modules/ad/domain/value-objects/AdTitle";
import {
  Campaign,
  ICampaignPrimitives,
} from "@/src/modules/campaign/domain/Campaign";
import { CampaignBudget } from "@/src/modules/campaign/domain/value-objects/Budget";
import { CampaignMetrics } from "@/src/modules/campaign/domain/value-objects/CampaignMetrics";
import { CampaignStatus } from "@/src/modules/campaign/domain/value-objects/CampaignStatus";
import { Clicks } from "@/src/modules/campaign/domain/value-objects/Clicks";
import {
  CardDetails,
  ICardDetailsParams,
  ICardDetailsPrimitives,
} from "@/src/modules/payment-methods/stripe/domain/CardDetails";
import {
  IStripePrimitives,
  Stripe,
} from "@/src/modules/payment-methods/stripe/domain/Stripe";
import { CardBrand } from "@/src/modules/payment-methods/stripe/domain/value-objects/CardBrand";
import { CustomerId } from "@/src/modules/payment-methods/stripe/domain/value-objects/CustomerId";
import { ExpMonth } from "@/src/modules/payment-methods/stripe/domain/value-objects/ExpMonth";
import { ExpYear } from "@/src/modules/payment-methods/stripe/domain/value-objects/ExpYear";
import { Last4 } from "@/src/modules/payment-methods/stripe/domain/value-objects/Last4";
import { PaymentMethodId } from "@/src/modules/payment-methods/stripe/domain/value-objects/PaymentMethodId";
import { ApiRoutes } from "@/src/utils/ApiRoutes";
import { getApiResponse } from "@/src/utils/helpers";
import { UniqId } from "@/src/utils/UniqId";
import { ErrorFetchingAdvertiser } from "../domain/errors/ErrorFetchingAdvertiser";
import {
  IAdvertiserApiCall
} from "../domain/interfaces/IAdvertiserApiCall";
import { IUpdateProfileDataProps } from "../use-case/UpdateAdvertiserProfileData";

export class FetchAdvertiserApiCalls implements IAdvertiserApiCall {
  async updateProfileData(props: IUpdateProfileDataProps): Promise<void> {
    const body = {
      email: props.email?.email,
      name: props.name?.name,
      profilePic: props.profilePic?.url,
    };

    const resp = await fetch(ApiRoutes.updateProfile, {
      method: "PUT",
      body: JSON.stringify(body),
    });

    const apiResp = getApiResponse(resp);
    if (!resp.ok)
      throw ErrorFetchingAdvertiser.updateProfile((await apiResp).message);
  }

  async getAdvertiserProfileData(): Promise<IAdvertiserData> {
    const resp = await fetch(ApiRoutes.advertiserDataProfile, {
      method: "GET",
    });
    const apiResp = await getApiResponse<IApiProfileResp>(resp);

    if (resp.status !== 200)
      throw ErrorFetchingAdvertiser.getAdvertiserProfileData(apiResp.message);
    if (!apiResp.data)
      throw ErrorFetchingAdvertiser.noDataAvailable(apiResp.message);

    const { ads, campaigns, stripeCustomer } = apiResp.data;
    const data: IAdvertiserData = {
      campaigns: this.toCampaigns(campaigns),
      ads: this.toAds(ads),
      stripeCustomer: this.toStripe(stripeCustomer),
    };
    return data;
  }

  private toCampaigns(campaigns: ICampaignPrimitives[]): Campaign[] {
    return campaigns.map((campaign) => {
      return new Campaign({
        id: new UniqId(campaign.id),
        adId: new UniqId(campaign.adId),
        advertiserId: new UniqId(campaign.advertiserId),
        budget: new CampaignBudget({
          balance: new Balance(campaign.budget.balance),
          clicks: new Clicks(campaign.budget.clicks),
        }),
        metrics: new CampaignMetrics({
          totalClicks: campaign.metrics.totalClicks,
          totalViews: campaign.metrics.totalViews,
        }),
        referrals: campaign.referrals.map((ref) => new UniqId(ref)),
        status: new CampaignStatus(campaign.status),
      });
    });
  }

  private toAds(ads: AdPropsPrimitives[]): Ad[] {
    return ads.map((ad) => {
      return new Ad({
        id: new UniqId(ad.id),
        advertiserId: new UniqId(ad.advertiserId),
        title: new AdTitle(ad.title),
        description: new AdDescription(ad.description),
        file: new AdFileUrl(ad.file),
        redirectionUrl: new AdRedirectionUrl(ad.redirectionUrl),
        segments: AdSegments.filterByAvailables(ad.segments),
      });
    });
  }

  private toStripe(stripe?: IStripePrimitives): Stripe | undefined {
    if (!stripe) return;
    return new Stripe({
      customerId: new CustomerId(stripe.customerId),
      paymentMethods: stripe.paymentMethods.map((pm) => this.toCardDetails(pm)),
      userId: new UniqId(stripe.userId),
      id: new UniqId(stripe.id),
    });
  }

  private toCardDetails(paymentMethod: ICardDetailsPrimitives): CardDetails {
    return new CardDetails({
      brand: new CardBrand(paymentMethod.brand),
      expMonth: new ExpMonth(paymentMethod.expMonth),
      expYear: new ExpYear(paymentMethod.expYear),
      last4: new Last4(paymentMethod.last4),
      paymentMethodId: new PaymentMethodId(paymentMethod.paymentMethodId),
    });
  }
}
