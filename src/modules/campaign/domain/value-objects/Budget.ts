import { Balance } from "@/src/domain/Balance";
import { ErrorCreatingCampaign } from "./ErrorCreatingCampaign";

export interface CampaignBudgetProps {
  balance: Balance;
  clicks: number;
}

export class CampaignBudget {
  readonly clicks;
  readonly balance;

  constructor(props: CampaignBudgetProps) {
    if (props.clicks <= 0 || props.balance.total <= 0)
      throw new ErrorCreatingCampaign("MaxClicks and balance must be > 0");
    this.clicks = props.clicks;
    this.balance = props.balance;
  }
}
