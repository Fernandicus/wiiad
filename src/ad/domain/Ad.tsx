import { AdDescription } from "./ValueObjects/AdDescription";
import { AdImage } from "./ValueObjects/AdImage";
import { AdRedirectionUrl } from "./ValueObjects/AdRedirectionUrl";
import { AdSegments } from "./ValueObjects/AdSegments";
import { AdTitle } from "./ValueObjects/AdTitle";
import { AdvertiserId } from "./ValueObjects/AdvertiserId";

export interface AdPropsPrimitives {
  title: string;
  description: string;
  image: string;
  redirectionUrl: string;
  advertiserId: string;
  segments: string[];
}

export interface AdProps {
  title: AdTitle;
  description: AdDescription;
  image: AdImage;
  redirectionUrl: AdRedirectionUrl;
  advertiserId: AdvertiserId;
  segments: AdSegments;
}

export class Ad {
  public readonly advertiserId: AdvertiserId;
  public readonly title: AdTitle;
  public readonly description: AdDescription;
  public readonly image: AdImage;
  public readonly redirectionUrl: AdRedirectionUrl;
  public readonly segments: AdSegments;

  constructor({
    title,
    description,
    image,
    redirectionUrl,
    advertiserId,
    segments,
  }: AdProps) {
    this.title = title;
    this.description = description;
    this.image = image;
    this.redirectionUrl = redirectionUrl;
    this.advertiserId = advertiserId;
    this.segments = segments;
  }
}
