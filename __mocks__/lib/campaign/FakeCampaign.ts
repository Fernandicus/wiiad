import { AdvertiserId } from "@/src/modules/advertiser/domain/value-objects/AdvertiserId";
import {
  Campaign,
  CampaignProps,
  ICampaignPrimitives,
} from "@/src/modules/campaign/domain/Campaign";
import { CampaignBudget } from "@/src/modules/campaign/domain/value-objects/Budget";
import { CampaignId } from "@/src/modules/campaign/domain/value-objects/CampaignId";
import { CampaignMetrics } from "@/src/modules/campaign/domain/value-objects/CampaignMetrics";
import { CampaignStatusType } from "@/src/modules/campaign/domain/value-objects/CampaignStatus";
import { UniqId } from "@/src/utils/UniqId";
import { v4 } from "uuid";

export class FakeCampaign extends Campaign {
  constructor(params: CampaignProps) {
    super(params);
  }

  static create(status = CampaignStatusType.STAND_BY): Campaign {
    let ids: string[] = this.generateIds();

    return new Campaign({
      id: new CampaignId(ids[0]),
      advertiserId: new AdvertiserId(ids[1]),
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
    let ids: string[] = this.generateIds();

    return {
      id: ids[0],
      advertiserId: ids[1],
      adId: ids[2],
      promoters: [ids[3]],
      watchers: [ids[4]],
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
      let uniqId = UniqId.new();
      ids.push(uniqId.id);
    }
    return ids;
  }
}
