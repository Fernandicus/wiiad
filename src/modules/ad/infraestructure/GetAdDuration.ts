import getVideoDurationInSeconds from "get-video-duration";
import { AdTimer } from "../domain/value-objects/AdTimer";
import { AdFileUrl } from "../domain/value-objects/AdFileUrl";

export class GetAdDuration {
  constructor(private adFile: AdFileUrl) {}

  async getAdTimer(): Promise<AdTimer> {
    if (this.adFile.isVideo()) {
      const duration = await getVideoDurationInSeconds(this.adFile.file);
      return new AdTimer(duration);
    }
    return AdTimer.defaultTime();
  }
}
