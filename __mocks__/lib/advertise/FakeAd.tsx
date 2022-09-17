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
    title,
    description,
    image,
    redirectionUrl,
    advertiserId,
    segments,
  }: AdProps) {
    super({
      title,
      description,
      image,
      redirectionUrl,
      advertiserId,
      segments,
    });
  }

  static createRandomWithAdvertiserId(id: string): Ad {
    const fakeAdData = this.generateFakeAdData();
    const adValueObjects = GetAdValueObjects.convertPrimitives({
      ...fakeAdData,
    });
    const advertiserId = new AdvertiserId(id);

    return new FakeAd({ ...adValueObjects, advertiserId });
  }

  static createRandom(): Ad {
    const fakeAdData = this.generateFakeAdData();
    const adValueObjects = GetAdValueObjects.convertPrimitives({
      ...fakeAdData,
    });

    return new FakeAd({ ...adValueObjects });
  }

  static empty(): Ad {
    const adValueObjects = GetAdValueObjects.convertPrimitives({
      title: "",
      description: "",
      image: "",
      redirectionUrl: "",
      advertiserId: "",
      segments: [],
    });

    return new FakeAd({
      ...adValueObjects,
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
