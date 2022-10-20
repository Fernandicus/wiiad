import {
  Campaign,
  CampaignProps,
  ICampaignPrimitives,
} from "@/src/modules/campaign/domain/Campaign";
import { CampaignBudget } from "@/src/modules/campaign/domain/value-objects/Budget";
import { CampaignMetrics } from "@/src/modules/campaign/domain/value-objects/CampaignMetrics";
import { CampaignStatusType } from "@/src/modules/campaign/domain/value-objects/CampaignStatus";
import { UniqId } from "@/src/utils/UniqId";
import { v4 } from "uuid";

export class FakeCampaign extends Campaign {
  constructor(params: CampaignProps) {
    super(params);
  }

  static create(status = CampaignStatusType.STAND_BY): Campaign {
    return new Campaign({
      id: UniqId.new(),
      advertiserId: UniqId.new(),
      adId: UniqId.new(),
      promoters: [UniqId.new()],
      watchers: [UniqId.new()],
      status: CampaignStatusType.STAND_BY,
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

  static createWithPrimitives(
    status = CampaignStatusType.STAND_BY
  ): ICampaignPrimitives {
    return {
      id: UniqId.generate(),
      advertiserId: UniqId.generate(),
      adId: UniqId.generate(),
      promoters: [UniqId.generate()],
      watchers: [UniqId.generate()],
      status: status,
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

  static createManyWithPrimitives(
    amount = 5,
    status = CampaignStatusType.STAND_BY
  ): ICampaignPrimitives[] {
    let campaigns: ICampaignPrimitives[] = [];

    for (let i = 1; i <= amount; i++) {
      let campaign: ICampaignPrimitives = {
        id: UniqId.generate(),
        adId: UniqId.generate(),
        advertiserId: UniqId.generate(),
        status: status,
        watchers: this.generateIds(),
        promoters: this.generateIds(),
        budget: {
          maxClicks: Math.floor(Math.random() * 10000),
          moneyToSpend: Math.floor(Math.random() * 10000),
        },
        metrics: {
          totalClicks: Math.floor(Math.random() * 10000),
          totalViews: Math.floor(Math.random() * 10000),
        },
      };
      campaigns.push(campaign);
    }

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