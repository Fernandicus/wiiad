import getVideoDurationInSeconds from "get-video-duration";
import { AdDuration } from "../domain/value-objects/AdDuration";
import { AdFileUrl } from "../domain/value-objects/AdFileUrl";

export class GetAdDuration {
  constructor(private adFile: AdFileUrl) {}

  async getAdDuration(): Promise<AdDuration> {
    if (this.adFile.isVideo()) {
      const duration = await getVideoDurationInSeconds(this.adFile.file);
      return new AdDuration(duration);
    }
    return AdDuration.defaultTime();
  }
}
