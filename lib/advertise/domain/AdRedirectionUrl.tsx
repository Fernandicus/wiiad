import CreateAdError from "./CreateAdError";

export default class AdRedirectionUrl {
  public readonly url;
  constructor(url: string) {
    if (url == null || url.length == 0) {
      throw new CreateAdError("Ad url is mandatory");
    }
    this.url = url;
  }
}
