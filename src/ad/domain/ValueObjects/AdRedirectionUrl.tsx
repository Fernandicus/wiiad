import {ErrorCreatingAd} from "../ErrorCreatingAd";

export class AdRedirectionUrl {
  public readonly url;
  constructor(url: string) {
    if (url == null || url.length == 0) {
      throw new ErrorCreatingAd("Ad url is mandatory");
    }
    this.url = url;
  }
}
