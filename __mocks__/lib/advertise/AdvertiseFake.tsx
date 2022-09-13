import AdDescription from "@/lib/advertise/domain/AdDescription";
import AdImage from "@/lib/advertise/domain/AdImage";
import AdRedirectionUrl from "@/lib/advertise/domain/AdRedirectionUrl";
import AdTitle from "@/lib/advertise/domain/AdTitle";
import { Advertise, AdvertiseProps } from "@/lib/advertise/domain/Advertise";
import { faker } from "@faker-js/faker";

export default class AdvertiseFake extends Advertise {
  
  constructor({
    title,
    description,
    image,
    redirectionUrl,
  }: AdvertiseProps) {
    super({ title, description, image, redirectionUrl });
  }

  static createRandom(): Advertise {
    const fakeTitle = faker.commerce.productName().substring(0, 30);
    const fakeDescription = faker.commerce.productDescription().substring(0, 500);

    const title = new AdTitle(fakeTitle);
    const description = new AdDescription(fakeDescription);
    const image = new AdImage(faker.image.avatar());
    const redirectionUrl = new AdRedirectionUrl(faker.internet.url());

    return new AdvertiseFake({ title, description, image, redirectionUrl });
  }

  static empty(): Advertise {
    const title = new AdTitle("");
    const description = new AdDescription("");
    const image = new AdImage("");
    const redirectionUrl = new AdRedirectionUrl("");

    return new AdvertiseFake({ title, description, image, redirectionUrl });
  }
}
