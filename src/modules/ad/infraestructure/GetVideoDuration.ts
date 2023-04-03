import getVideoDurationInSeconds from "get-video-duration";
import { IGetAdDuration } from "../domain/interfaces/IGetAdDuration";
import { AdDuration } from "../domain/value-objects/AdDuration";
import { AdFileUrl } from "../domain/value-objects/AdFileUrl";

export class GetVideoDuration implements IGetAdDuration {
  async get(adFile: AdFileUrl): Promise<AdDuration> {
    if (adFile.isVideo()) {
      const duration = await getVideoDurationInSeconds(adFile.file);
      return new AdDuration(duration);
    }
    return AdDuration.defaultTime();
  }
}
