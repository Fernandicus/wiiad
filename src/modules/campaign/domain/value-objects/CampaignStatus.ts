import { ErrorCreatingCampaign } from "./ErrorCreatingCampaign";

export enum CampaignStatusType {
  STAND_BY = "standBy",
  ACTIVE = "active",
  FINISHED = "finished",
}

export class CampaignStatus {
  readonly status;
  constructor(status: string) {
    const campaignStatus = Object.values(CampaignStatusType);
    const statusFound = campaignStatus.find((value) => value == status);
    if (!statusFound)
      throw new ErrorCreatingCampaign(
        `Status '${status}' do not exist. Available status are: ${[
          ...campaignStatus,
        ]}`
      );
    this.status = status;
  }
}
