import { IGetAdDuration } from "../domain/interfaces/IGetAdDuration";
import { AdDuration } from "../domain/value-objects/AdDuration";
import { AdFileUrl } from "../domain/value-objects/AdFileUrl";
import ffprobe from "ffprobe";
import ffprobeStatic from  "ffprobe-static";

export class GetVideoDuration implements IGetAdDuration {
  async get(adFile: AdFileUrl): Promise<AdDuration> {
    if (adFile.isVideo()) {
      const videoInfo = await ffprobe(adFile.file, { path: ffprobeStatic.path });
      const duration = videoInfo.streams[0].duration!
      return new AdDuration(duration);
    }
    return AdDuration.defaultTime();
  }
}
