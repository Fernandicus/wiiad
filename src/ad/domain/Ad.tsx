import { AdDescription } from "./ValueObjects/AdDescription";
import { AdId } from "./ValueObjects/AdId";
import { AdImage } from "./ValueObjects/AdImage";
import { AdRedirectionUrl } from "./ValueObjects/AdRedirectionUrl";
import { AdSegments } from "./ValueObjects/AdSegments";
import { AdTitle } from "./ValueObjects/AdTitle";
import { AdvertiserId } from "./ValueObjects/AdvertiserId";

export interface AdPropsPrimitives {
  id: string;
  title: string;
  description: string;
  image: string;
  redirectionUrl: string;
  advertiserId: string;
  segments: string[];
}

export interface AdProps {
  id: AdId;
  title: AdTitle;
  description: AdDescription;
  image: AdImage;
  redirectionUrl: AdRedirectionUrl;
  advertiserId: AdvertiserId;
  segments: AdSegments;
}

export class Ad {
  public readonly id: AdId;
  public readonly advertiserId: AdvertiserId;
  public readonly title: AdTitle;
  public readonly description: AdDescription;
  public readonly image: AdImage;
  public readonly redirectionUrl: AdRedirectionUrl;
  public readonly segments: AdSegments;

  constructor({
    id,
    title,
    description,
    image,
    redirectionUrl,
    advertiserId,
    segments,
  }: AdProps) {
    (this.id = id), (this.title = title);
    this.description = description;
    this.image = image;
    this.redirectionUrl = redirectionUrl;
    this.advertiserId = advertiserId;
    this.segments = segments;
  }

  static createFromPrimitives({
    id,
    advertiserId,
    title,
    description,
    image,
    redirectionUrl,
    segments,
  }: AdPropsPrimitives): Ad {
    return new Ad({
      id: new AdId(id),
      segments: new AdSegments(segments),
      title: new AdTitle(title),
      description: new AdDescription(description),
      image: new AdImage(image),
      redirectionUrl: new AdRedirectionUrl(redirectionUrl),
      advertiserId: new AdvertiserId(advertiserId),
    });
  }
}
