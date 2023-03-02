export class ErrorFindingAd extends Error {
  constructor(message: string) {
    super(message);
  }

  static byAdId(id: string): ErrorFindingAd {
    return new ErrorFindingAd(`No ad found for the id ${id}`);
  }

  static byAdvertiserId(id: string): ErrorFindingAd {
    return new ErrorFindingAd(`No ads found for the given advertiser id ${id}`);
  }
}
