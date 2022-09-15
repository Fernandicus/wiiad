import AdDescription from "./ValueObjects/AdDescription";
import AdImage from "./ValueObjects/AdImage";
import AdRedirectionUrl from "./ValueObjects/AdRedirectionUrl";
import AdTitle from "./ValueObjects/AdTitle";
import AdvertiserId from "./ValueObjects/AdvertiserId";

export interface AdProps {
  title: AdTitle;
  description: AdDescription;
  image: AdImage;
  redirectionUrl: AdRedirectionUrl;
  advertiserId: AdvertiserId;
}

export class Ad {
  public readonly advertiserId: AdvertiserId;
  public readonly title: AdTitle;
  public readonly description: AdDescription;
  public readonly image: AdImage;
  public readonly redirectionUrl: AdRedirectionUrl;

  constructor({ title, description, image, redirectionUrl, advertiserId }: AdProps) {
    this.title = title;
    this.description = description;
    this.image = image;
    this.redirectionUrl = redirectionUrl;
    this.advertiserId = advertiserId;
  }
}
