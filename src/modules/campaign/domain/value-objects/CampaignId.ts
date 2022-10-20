import { ErrorCreatingCampaign } from "./ErrorCreatingCampaign";

export class CampaignId {
  readonly id;
  constructor(id: string) {
    if (id == "") {
      throw new ErrorCreatingCampaign("Campaign id is mandatory");
    }

    this.id = id;
  }
}
