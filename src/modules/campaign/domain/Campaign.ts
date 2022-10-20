import { UniqId } from "@/src/utils/UniqId";
import { AdvertiserId } from "../../advertiser/domain/value-objects/AdvertiserId";
import { User } from "../../user/domain/User";
import { CampaignBudget } from "./value-objects/Budget";
import { CampaignId } from "./value-objects/CampaignId";
import { CampaignMetrics } from "./value-objects/CampaignMetrics";
import { CampaignStatusType } from "./value-objects/CampaignStatus";

export interface ICampaignPrimitives {
  id: string;
  advertiserId: string;
  adId: string;
  promoters: string[];
  watchers: string[];
  status: string;
  budget: {
    moneyToSpend: number;
    maxClicks: number;
  };
  metrics: {
    totalViews: number;
    totalClicks: number;
  };
}

export interface CampaignProps {
  id: CampaignId;
  advertiserId: AdvertiserId;
  adId: UniqId;
  promoters: UniqId[];
  watchers: UniqId[];
  status: CampaignStatusType;
  budget: CampaignBudget;
  metrics: CampaignMetrics;
}

export class Campaign {
  readonly id: CampaignId;
  readonly advertiserId: AdvertiserId;
  readonly adId: UniqId;
  readonly promoters: UniqId[];
  readonly watchers: UniqId[];
  readonly status: CampaignStatusType;
  readonly budget: CampaignBudget;
  readonly metrics: CampaignMetrics;

  constructor(props: CampaignProps) {
    this.id = props.id;
    this.advertiserId = props.advertiserId;
    this.adId = props.adId;
    this.promoters = props.promoters;
    this.watchers = props.watchers;
    this.status = props.status;
    this.budget = props.budget;
    this.metrics = props.metrics;
  }
}
