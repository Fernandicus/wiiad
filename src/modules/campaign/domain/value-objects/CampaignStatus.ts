import { ErrorCreatingCampaign } from "./ErrorCreatingCampaign";

export enum CampaignStatusType {
  ACTIVE = "active",
  STAND_BY = "standBy",
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

  static active():CampaignStatus{
    return new CampaignStatus(CampaignStatusType.ACTIVE)
  }

  static finished():CampaignStatus{
    return new CampaignStatus(CampaignStatusType.FINISHED)
  }
  static standBy():CampaignStatus{
    return new CampaignStatus(CampaignStatusType.STAND_BY)
  }
}
