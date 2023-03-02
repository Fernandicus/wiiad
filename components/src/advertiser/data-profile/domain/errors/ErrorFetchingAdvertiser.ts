export class ErrorFetchingAdvertiser extends Error {
  constructor(message: string) {
    super(message);
  }

  static gettingAllCampaigns(cause?: string): ErrorFetchingAdvertiser {
    return new ErrorFetchingAdvertiser(
      "Something went wrong getting campaigns"
    );
  }

  static getAdvertiserProfileData(cause?: string): ErrorFetchingAdvertiser {
    return new ErrorFetchingAdvertiser(
      "Something went wrong getting advertiser profile"
    );
  }

  static noDataAvailable(cause?: string): ErrorFetchingAdvertiser {
    return new ErrorFetchingAdvertiser("Advertiser data is empty");
  }

  static updateProfile(cause?: string): ErrorFetchingAdvertiser {
    return new ErrorFetchingAdvertiser(
      "Something went wrong updating advertiser profile"
    );
  }
}
