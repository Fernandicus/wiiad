import { AdDescription } from "@/src/ad/domain/ValueObjects/AdDescription";
import { AdImage } from "@/src/ad/domain/ValueObjects/AdImage";
import { AdRedirectionUrl } from "@/src/ad/domain/ValueObjects/AdRedirectionUrl";
import { AdTitle } from "@/src/ad/domain/ValueObjects/AdTitle";
import { Ad, AdProps, AdPropsPrimitives } from "@/src/ad/domain/Ad";
import { faker } from "@faker-js/faker";
import { AdConstants } from "@/src/ad/ad-constants";
import { AdvertiserId } from "@/src/ad/domain/ValueObjects/AdvertiserId";
import {
  AdSegments,
  AdSegmentType,
} from "@/src/ad/domain/ValueObjects/AdSegments";
import { GetAdValueObjects } from "@/src/ad/domain/services/GetAdValueObjects";

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

  static withIds({
    advertiserId,
    adId,
  }: {
    advertiserId: string;
    adId: string;
  }): Ad {
    const fakeAdData = this.generateFakeAdData();
    const ad = Ad.createFromPrimitives({ ...fakeAdData, advertiserId, id: adId });

    return new FakeAd({ ...ad });
  }

  /*   static createRandom(): Ad {
    const fakeAdData = this.generateFakeAdData();
    const ad = Ad.createFromPrimitives({ ...fakeAdData });

    return new FakeAd({ ...ad });
  } */

  static empty(): Ad {
    const ad = Ad.createFromPrimitives({
      id: "",
      title: "",
      description: "",
      image: "",
      redirectionUrl: "",
      advertiserId: "",
      segments: [],
    });

    return new FakeAd({ ...ad });
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
}
