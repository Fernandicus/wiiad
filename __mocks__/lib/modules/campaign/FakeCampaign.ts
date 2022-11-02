import { AdPropsPrimitives } from "@/src/modules/ad/domain/Ad";
import {
  Campaign,
  CampaignProps,
  ICampaignPrimitives,
} from "@/src/modules/campaign/domain/Campaign";
import { CampaignBudget } from "@/src/modules/campaign/domain/value-objects/Budget";
import { CampaignMetrics } from "@/src/modules/campaign/domain/value-objects/CampaignMetrics";
import { CampaignStatus, CampaignStatusType } from "@/src/modules/campaign/domain/value-objects/CampaignStatus";
import { UniqId } from "@/src/utils/UniqId";
import { v4 } from "uuid";

export class FakeCampaign extends Campaign {
  constructor(params: CampaignProps) {
    super(params);
  }

  static create(props: {
    status: CampaignStatusType;
    advertiserId: UniqId;
  }): Campaign {
    return new Campaign({
      id: UniqId.new(),
      advertiserId: props.advertiserId,
      adId: UniqId.new(),
      referrals: [UniqId.new()],
      watchers: [UniqId.new()],
      status: new CampaignStatus(props.status) ,
      budget: new CampaignBudget({
        moneyToSpend: 5,
        maxClicks: 5,
      }),
      metrics: new CampaignMetrics({
        totalViews: 3,
        totalClicks: 10,
      }),
    });
  }

  static createWithPrimitives(props: {
    status: CampaignStatusType;
    advertiserId: string;
    adId: string;
  }): ICampaignPrimitives {
    return {
      id: UniqId.generate(),
      advertiserId: props.advertiserId,
      adId: props.adId,
      referrals: this.generateIds(),
      watchers: this.generateIds(),
      status: props.status,
      budget: {
        moneyToSpend: 5,
        maxClicks: 5,
      },
      metrics: {
        totalViews: 3,
        totalClicks: 10,
      },
    };
  }

  static createManyWithPrimitives(props: {
    amount: number;
    status: CampaignStatusType;
    advertiserId: string;
  }): ICampaignPrimitives[] {
    const { advertiserId, amount, status } = props;
    let campaigns: ICampaignPrimitives[] = [];

    for (let i = 1; i <= amount; i++) {
      let campaign = this.createWithPrimitives({
        advertiserId: advertiserId,
        status,
        adId: UniqId.generate(),
      });
      campaigns.push(campaign);
    }

    return campaigns;
  }

  static createManyFromGivenAds(
    ads: AdPropsPrimitives[],
    status: CampaignStatusType
  ): ICampaignPrimitives[] {
    const campaigns = ads.map((ad) => {
      return this.createWithPrimitives({
        advertiserId: ad.advertiserId,
        adId: ad.id,
        status,
      });
    });

    return campaigns;
  }

  private static generateIds(amount = 5): string[] {
    let ids: string[] = [];

    for (let i = 1; i <= amount; i++) {
      ids.push(UniqId.generate());
    }
    return ids;
  }
}
