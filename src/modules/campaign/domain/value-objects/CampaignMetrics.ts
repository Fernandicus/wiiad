interface CampaignMetricsProps {
  totalViews: number;
  totalClicks: number;
}

export class CampaignMetrics {
  readonly totalClicks;
  readonly totalViews;
  constructor(params: CampaignMetricsProps) {
    this.totalClicks = params.totalClicks;
    this.totalViews = params.totalViews;
  }
}
