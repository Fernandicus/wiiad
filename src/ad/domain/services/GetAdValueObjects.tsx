import { AdProps, AdPropsPrimitives } from "../Ad";
import { AdDescription } from "../ValueObjects/AdDescription";
import { AdImage } from "../ValueObjects/AdImage";
import { AdRedirectionUrl } from "../ValueObjects/AdRedirectionUrl";
import { AdSegments } from "../ValueObjects/AdSegments";
import { AdTitle } from "../ValueObjects/AdTitle";
import { AdvertiserId } from "../ValueObjects/AdvertiserId";

export class GetAdValueObjects {
  static convertPrimitives({
    title,
    description,
    image,
    redirectionUrl,
    advertiserId,
    segments,
  }: AdPropsPrimitives): AdProps {
    return {
      segments: new AdSegments(segments),
      title: new AdTitle(title),
      description: new AdDescription(description),
      image: new AdImage(image),
      redirectionUrl: new AdRedirectionUrl(redirectionUrl),
      advertiserId: new AdvertiserId(advertiserId),
    };
  }
}
