import { AdDescription } from "./value-objects/AdDescription";
import { AdId } from "./value-objects/AdId";
import { AdImage } from "./value-objects/AdImage";
import { AdRedirectionUrl } from "./value-objects/AdRedirectionUrl";
import { AdSegments } from "./value-objects/AdSegments";
import { AdTitle } from "./value-objects/AdTitle";
import { AdvertiserId } from "../../advertiser/domain/value-objects/AdvertiserId";

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

  toPrimitives(): AdPropsPrimitives {
    return {
      id: this.id.id,
      advertiserId: this.advertiserId.id,
      title: this.title.title,
      description: this.description.description,
      image: this.image.image,
      redirectionUrl: this.redirectionUrl.url,
      segments: this.segments.segments,
    };
  }
}