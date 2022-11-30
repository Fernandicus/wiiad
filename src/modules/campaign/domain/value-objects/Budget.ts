import { Balance } from "@/src/common/domain/Balance";
import {
  AvailableAmounts,
  PaymentAmount,
} from "@/src/modules/payment-methods/stripe/domain/value-objects/PaymentAmount";
import { ErrorCreatingCampaign } from "./ErrorCreatingCampaign";

export interface ICampaignBudgetPrimitives {
  balance: number;
  clicks: number;
}

export interface CampaignBudgetProps {
  balance: Balance;
  clicks: number;
}

export class CampaignBudget {
  readonly clicks;
  readonly balance;

  constructor({ balance, clicks }: CampaignBudgetProps) {
    if (clicks <= 0 || balance.total <= 0)
      throw new ErrorCreatingCampaign("MaxClicks and balance must be > 0");
    this.clicks = clicks;
    this.balance = balance;
  }

  static fromAmount(amount: PaymentAmount): CampaignBudget {
    return new CampaignBudget({
      balance: new Balance(amount.amount),
      clicks: this.getTotalClicks(amount),
    });
  }

  toPrimitives(): ICampaignBudgetPrimitives {
    return {
      balance: this.balance.total,
      clicks: this.clicks,
    };
  }

  private static getTotalClicks(amount: PaymentAmount): number {
    return amount.amount / 100 / 0.05;
  }
}
