import AdDescription from "./AdDescription";
import AdImage from "./AdImage";
import AdRedirectionUrl from "./AdRedirectionUrl";
import AdTitle from "./AdTitle";

export interface AdvertiseProps {
  title: AdTitle;
  description: AdDescription;
  image: AdImage;
  redirectionUrl: AdRedirectionUrl;
}

export class Advertise {
  public readonly title: AdTitle;
  public readonly description: AdDescription;
  public readonly image: AdImage;
  public readonly redirectionUrl: AdRedirectionUrl;

  constructor({ title, description, image, redirectionUrl }: AdvertiseProps) {
    this.title = title;
    this.description = description;
    this.image = image;
    this.redirectionUrl = redirectionUrl;
  }
}
