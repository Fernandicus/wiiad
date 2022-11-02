import { UniqId } from "@/src/utils/UniqId";
import { User } from "../../user/domain/User";
import { CampaignBudget, CampaignBudgetProps } from "./value-objects/Budget";
import { CampaignMetrics } from "./value-objects/CampaignMetrics";
import { CampaignStatus, CampaignStatusType } from "./value-objects/CampaignStatus";

export interface ICampaignPrimitives {
  id: string;
  advertiserId: string;
  adId: string;
  referrals: string[];
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
  referrals: UniqId[];
  watchers: UniqId[];
  status: CampaignStatus;
  budget: CampaignBudget;
  metrics: CampaignMetrics;
}

export class Campaign {
  readonly id: UniqId;
  readonly advertiserId: UniqId;
  readonly adId: UniqId;
  readonly referrals: UniqId[];
  readonly watchers: UniqId[];
  readonly status: CampaignStatus;
  readonly budget: CampaignBudget;
  readonly metrics: CampaignMetrics;

  constructor(props: CampaignProps) {
    this.id = props.id;
    this.advertiserId = props.advertiserId;
    this.adId = props.adId;
    this.referrals = props.referrals;
    this.watchers = props.watchers;
    this.status = props.status;
    this.budget = props.budget;
    this.metrics = props.metrics;
  }

  static new(props: {
    advertiserId: UniqId;
    adId: UniqId;
    id: UniqId;
    budget: CampaignBudget;
  }): Campaign {
    return new Campaign({
      id: props.id,
      advertiserId: props.advertiserId,
      adId: props.adId,
      referrals: [],
      watchers: [],
      status: new CampaignStatus(CampaignStatusType.ACTIVE),
      budget: props.budget,
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
      referrals: this.referrals.map((referral) => referral.id),
      watchers: this.watchers.map((watcher) => watcher.id),
      budget: {
        maxClicks: this.budget.maxClicks,
        moneyToSpend: this.budget.moneyToSpend,
      },
      metrics: {
        totalClicks: this.metrics.totalClicks,
        totalViews: this.metrics.totalViews,
      },
      status: this.status.status,
    };
  }
}
