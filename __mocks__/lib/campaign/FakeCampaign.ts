import { AdId } from "@/src/modules/ad/domain/value-objects/AdId";
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
    let ids: string[] = [];

    for(let i = 0; i <= 4; i++) {
      let uniqId = new UniqId();
      ids.push(uniqId.id);
    }

    return new Campaign({
      id: new CampaignId(ids[0]),
      advertiserId: new AdvertiserId(ids[1]),
      adId: new AdId(ids[2]),
      promoters: [new UniqId()],
      watchers: [new UniqId()],
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
    let ids: string[] = [];

    for(let i = 0; i <= 4; i++) {
      let uniqId = new UniqId();
      ids.push(uniqId.id);
    }

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
}
