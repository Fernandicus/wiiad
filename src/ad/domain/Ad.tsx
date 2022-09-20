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

  constructor(adProps: AdProps) {
    this.id = adProps.id;
    this.title = adProps.title;
    this.description = adProps.description;
    this.image = adProps.image;
    this.redirectionUrl = adProps.redirectionUrl;
    this.advertiserId = adProps.advertiserId;
    this.segments = adProps.segments;
  }
}
