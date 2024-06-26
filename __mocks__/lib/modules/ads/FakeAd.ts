import { AdDescription } from "@/src/modules/ad/domain/value-objects/AdDescription";
import { AdFileUrl } from "@/src/modules/ad/domain/value-objects/AdFileUrl";
import { AdRedirectionUrl } from "@/src/modules/ad/domain/value-objects/AdRedirectionUrl";
import { AdTitle } from "@/src/modules/ad/domain/value-objects/AdTitle";
import { Ad, AdProps, AdPropsPrimitives } from "@/src/modules/ad/domain/Ad";
import { faker } from "@faker-js/faker";
import {
  AdSegments,
  AdSegmentType,
} from "@/src/modules/ad/domain/value-objects/AdSegments";
import { UniqId } from "@/src/common/domain/UniqId";

export class FakeAd extends Ad {
  constructor(adProps: AdProps) {
    super(adProps);
  }

  static createWithPrimitives(advertiserId: string): AdPropsPrimitives {
    const fakeAd = this.generateFakeAdData();
    return {
      ...fakeAd,
      advertiserId,
      id: UniqId.generate(),
    };
  }

  static create(advertiserId: UniqId): Ad {
    const fakeAdData = this.generateFakeAdData();
    return this.getAd({
      ...fakeAdData,
      advertiserId: advertiserId.id,
      id: UniqId.generate(),
    });
  }

  static createMany(advertiserId: UniqId, amount: number): Ad[] {
    const fakeAdData = this.generateFakeAdData();
    let ads: Ad[] = [];

    for (var i = 1; i <= amount; i++) {
      const ad = this.getAd({
        ...fakeAdData,
        advertiserId: advertiserId.id,
        id: UniqId.generate(),
      });
      ads.push(ad);
    }
    return ads;
  }

  static createManyWithRandomAdvertiserIds(amount: number): Ad[] {
    const fakeAdData = this.generateFakeAdData();
    let ads: Ad[] = [];

    for (var i = 0; i < amount; i++) {
      const ad = this.getAd({
        ...fakeAdData,
        advertiserId: UniqId.generate(),
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
    advertiserId: UniqId;
    adId: UniqId;
  }): Ad {
    const fakeAdData = this.generateFakeAdData();
    return this.getAd({
      ...fakeAdData,
      advertiserId: advertiserId.id,
      id: adId.id,
    });
  }

  static empty(): Ad {
    return this.getAd({
      title: "",
      description: "",
      advertiserId: "",
      id: "",
      file: "",
      redirectionUrl: "",
      segments: [],
    });
  }

  private static generateFakeAdData(): AdPropsPrimitives {
    const title = faker.commerce.productName().substring(0, AdTitle.maxLength);
    const description = faker.commerce
      .productDescription()
      .substring(0, AdDescription.maxLength);
    const file = faker.image.avatar();
    const redirectionUrl = faker.internet.url();
    const advertiserId = faker.random.numeric(10);
    const segments = this.getRandomAdSegments();

    return {
      id: "",
      title,
      description,
      file,
      redirectionUrl,
      advertiserId,
      segments,
    };
  }

  private static getRandomAdSegments(): string[] {
    const adSegments =  AdSegments.withAllAvailables().segments;
    const adSegmentsLength = adSegments.length;
    const maxLengthArray = Math.floor(Math.random() * 4);

    let segments: string[] = [];

    for (var i = 0; i <= maxLengthArray; i++) {
      const randomNum = Math.floor(Math.random() * adSegmentsLength);
      segments.push(adSegments[randomNum]);
    }

    return segments;
  }

  private static getAd(adProps: AdPropsPrimitives): Ad {
    return new Ad({
      id: UniqId.new(),
      segments: AdSegments.filterByAvailables(adProps.segments),
      title: new AdTitle(adProps.title),
      description: new AdDescription(adProps.description),
      file: new AdFileUrl(adProps.file),
      redirectionUrl: new AdRedirectionUrl(adProps.redirectionUrl),
      advertiserId: new UniqId(adProps.advertiserId),
    });
  }
}
