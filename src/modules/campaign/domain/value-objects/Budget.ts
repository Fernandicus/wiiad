interface CampaignBudgetProps {
  moneyToSpend: number;
  maxClicks: number;
}

export class CampaignBudget {
  readonly maxClicks;
  readonly moneyToSpend;
  
  constructor(props: CampaignBudgetProps) {
    this.maxClicks = props.maxClicks;
    this.moneyToSpend = props.moneyToSpend
  }
}
