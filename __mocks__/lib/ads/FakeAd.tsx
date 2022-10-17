import { AdDescription } from "@/src/modules/ad/domain/value-objects/AdDescription";
import { AdImage } from "@/src/modules/ad/domain/value-objects/AdImage";
import { AdRedirectionUrl } from "@/src/modules/ad/domain/value-objects/AdRedirectionUrl";
import { AdTitle } from "@/src/modules/ad/domain/value-objects/AdTitle";
import { Ad, AdProps, AdPropsPrimitives } from "@/src/modules/ad/domain/Ad";
import { faker } from "@faker-js/faker";
import { AdConstants } from "@/src/modules/ad/ad-constants";
import { AdvertiserId } from "@/src/modules/advertiser/domain/value-objects/AdvertiserId";
import {
  AdSegments,
  AdSegmentType,
} from "@/src/modules/ad/domain/value-objects/AdSegments";
import { AdId } from "@/src/modules/ad/domain/value-objects/AdId";
import { UniqId } from "@/src/utils/UniqId";

export class FakeAd extends Ad {
  constructor(adProps: AdProps) {
    super(adProps);
  }

  static createWithPrimitives(advertiserId: string): AdPropsPrimitives {
    const fakeAd = this.generateFakeAdData();
    return {
      ...fakeAd,
      id: UniqId.generate(),
    };
  }

  static createMany(advertiserId: string, amount: number): Ad[] {
    const fakeAdData = this.generateFakeAdData();
    let ads: Ad[] = [];

    for (var i = 0; i <= amount; i++) {
      const ad = this.getAd({
        ...fakeAdData,
        advertiserId,
        id: UniqId.generate(),
      });
      ads.push(ad);
    }
    return ads;
  }

  static createManyWithPrimitives(
    advertiserId: string,
    amount: number
  ): AdPropsPrimitives[] {
    let ads: AdPropsPrimitives[] = [];
    for (var i = 0; i <= amount - 1; i++) {
      ads.push({
        ...this.generateFakeAdData(),
        advertiserId,
        id: UniqId.generate(),
      });
    }
    return ads;
  }

  static createPrimitivesWithGivenIds({
    advertiserId,
    adId,
  }: {
    advertiserId: string;
    adId: string;
  }): AdPropsPrimitives {
    const fakeAdData = this.generateFakeAdData();
    return { ...fakeAdData, advertiserId, id: adId };
  }

  static createWithGivenIds({
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
