import { UniqId } from "@/src/utils/UniqId";
import { User } from "../../user/domain/User";
import { CampaignBudget, CampaignBudgetProps } from "./value-objects/Budget";
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
  id: UniqId;
  advertiserId: UniqId;
  adId: UniqId;
  promoters: UniqId[];
  watchers: UniqId[];
  status: CampaignStatusType;
  budget: CampaignBudget;
  metrics: CampaignMetrics;
}

export class Campaign {
  readonly id: UniqId;
  readonly advertiserId: UniqId;
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

  static new(props: {
    advertiserId: UniqId;
    adId: UniqId;
    id: UniqId;
    budget: CampaignBudget,
  }): Campaign {
    return new Campaign({
      id: props.id,
      advertiserId: props.advertiserId,
      adId: props.adId,
      promoters: [],
      watchers: [],
      status: CampaignStatusType.ACTIVE,
      budget:props.budget,
      metrics: new CampaignMetrics({
        totalViews: 0,
        totalClicks: 0,
      }),
    });
  }

  toPrimitives(): ICampaignPrimitives {
    return {
      id: this.id.id,
      adId: this.adId.id,
      advertiserId: this.advertiserId.id,
      promoters: this.promoters.map((promoter) => promoter.id),
      watchers: this.watchers.map((watcher) => watcher.id),
      budget: {
        maxClicks: this.budget.maxClicks,
        moneyToSpend: this.budget.moneyToSpend,
      },
      metrics: {
        totalClicks: this.metrics.totalClicks,
        totalViews: this.metrics.totalViews,
      },
      status: this.status,
    };
  }
}
