import { AdDescription } from "@/src/ad/domain/value-objects/AdDescription";
import { AdImage } from "@/src/ad/domain/value-objects/AdImage";
import { AdRedirectionUrl } from "@/src/ad/domain/value-objects/AdRedirectionUrl";
import { AdTitle } from "@/src/ad/domain/value-objects/AdTitle";
import { Ad, AdProps, AdPropsPrimitives } from "@/src/ad/domain/Ad";
import { faker } from "@faker-js/faker";
import { AdConstants } from "@/src/ad/ad-constants";
import { AdvertiserId } from "@/src/advertiser/domain/value-objects/AdvertiserId";
import {
  AdSegments,
  AdSegmentType,
} from "@/src/ad/domain/value-objects/AdSegments";
import { AdId } from "@/src/ad/domain/value-objects/AdId";
import { AdUniqId } from "@/src/ad/infraestructure/AdUniqId";

export class FakeAd extends Ad {
  constructor({
    id,
    title,
    description,
    image,
    redirectionUrl,
    advertiserId,
    segments,
  }: AdProps) {
    super({
      id,
      title,
      description,
      image,
      redirectionUrl,
      advertiserId,
      segments,
    });
  }

  static createManyWithPrimitives(
    advertiserId: string,
    amount: number
  ): AdPropsPrimitives[] {
    let ads: AdPropsPrimitives[] = [];
    for (var i = 0; i <= amount; i++) {
      ads.push({
        ...this.generateFakeAdData(),
        advertiserId,
        id: AdUniqId.generate(),
      });
    }
    return ads;
  }

  static withIds({
    advertiserId,
    adId,
  }: {
    advertiserId: string;
    adId: string;
  }): Ad {
    const fakeAdData = this.generateFakeAdData();
    return this.getAd({ ...fakeAdData, advertiserId, id: adId });
  }

  static empty(): Ad {
    return this.getAd({
      title: "",
      description: "",
      advertiserId: "",
      id: "",
      image: "",
      redirectionUrl: "",
      segments: [],
    });
  }

  private static generateFakeAdData(): AdPropsPrimitives {
    const title = faker.commerce
      .productName()
      .substring(0, AdConstants.titleMaxLength);
    const description = faker.commerce
      .productDescription()
      .substring(0, AdConstants.descriptionMaxLength);
    const image = faker.image.avatar();
    const redirectionUrl = faker.internet.url();
    const advertiserId = faker.random.numeric(10);
    const segments = this.getRandomAdSegments();

    return {
      id: "",
      title,
      description,
      image,
      redirectionUrl,
      advertiserId,
      segments,
    };
  }

  private static getRandomAdSegments(): AdSegmentType[] {
    const adSegments = Object.values(AdSegmentType);
    const adSegmentsLength = adSegments.length;
    const maxLengthArray = Math.floor(Math.random() * 4);

    let segments: AdSegmentType[] = [];

    for (var i = 0; i <= maxLengthArray; i++) {
      const randomNum = Math.floor(Math.random() * adSegmentsLength);
      segments.push(adSegments[randomNum]);
    }

    return segments;
  }

  private static getAd(adProps: AdPropsPrimitives): Ad {
    return new Ad({
      id: new AdId(adProps.id),
      segments: new AdSegments(adProps.segments),
      title: new AdTitle(adProps.title),
      description: new AdDescription(adProps.description),
      image: new AdImage(adProps.image),
      redirectionUrl: new AdRedirectionUrl(adProps.redirectionUrl),
      advertiserId: new AdvertiserId(adProps.advertiserId),
    });
  }
}
