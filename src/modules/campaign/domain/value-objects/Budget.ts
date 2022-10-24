import { ErrorCreatingCampaign } from "./ErrorCreatingCampaign";

export interface CampaignBudgetProps {
  moneyToSpend: number;
  maxClicks: number;
}

export class CampaignBudget {
  readonly maxClicks;
  readonly moneyToSpend;

  constructor(props: CampaignBudgetProps) {
    if (props.maxClicks <= 0 || props.moneyToSpend <= 0)
      throw new ErrorCreatingCampaign("MaxClicks and MoneyToSpend must be > 0");
    this.maxClicks = props.maxClicks;
    this.moneyToSpend = props.moneyToSpend;
  }
}
