import { Balance } from "@/src/common/domain/Balance";
import { PricesPerClick } from "@/src/common/domain/PricesPerClick";
import {
  //AvailableAmounts,
  PaymentAmount,
} from "@/src/modules/payment-methods/stripe/domain/value-objects/PaymentAmount";
import { Clicks } from "./Clicks";
import { ErrorCreatingCampaign } from "./ErrorCreatingCampaign";

export interface ICampaignBudgetPrimitives {
  balance: number;
  clicks: number;
}

export interface CampaignBudgetProps {
  balance: Balance;
  clicks: Clicks;
}

export class CampaignBudget {
  readonly clicks;
  readonly balance;

  constructor({ balance, clicks }: CampaignBudgetProps) {
    if (clicks.clicks <= 0 || balance.total <= 0)
      throw new ErrorCreatingCampaign("MaxClicks and balance must be > 0");
    this.clicks = clicks;
    this.balance = balance;
  }

  toPrimitives(): ICampaignBudgetPrimitives {
    return {
      balance: this.balance.total,
      clicks: this.clicks.clicks,
    };
  }
}
