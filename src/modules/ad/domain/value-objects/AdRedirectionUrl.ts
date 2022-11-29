import {ErrorCreatingAd} from "../errors/ErrorCreatingAd";

export class AdRedirectionUrl {
  public readonly url;
  constructor(url: string) {
    if (url.length == 0) {
      throw new ErrorCreatingAd("Ad url is mandatory");
    }
    this.url = url;
  }
}
