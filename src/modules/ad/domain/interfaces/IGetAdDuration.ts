import { AdDuration } from "../value-objects/AdDuration";
import { AdFileUrl } from "../value-objects/AdFileUrl";

export interface IGetAdDuration {
  get(adFile: AdFileUrl): Promise<AdDuration>;
}
