export class ErrorFetchingAdvertiser extends Error {
  constructor(params: { message: string; cause?: string }) {
    const { message, cause } = params;
    super(message, { cause });
  }

  static gettingAllCampaigns(cause?: string): ErrorFetchingAdvertiser {
    return new ErrorFetchingAdvertiser({
      message: "Something went wrong getting campaigns",
      cause,
    });
  }

  static getAdvertiserProfileData(cause?:string):ErrorFetchingAdvertiser{
    return new ErrorFetchingAdvertiser({
      message: "Something went wrong getting advertiser profile",
      cause,
    });
  }

  static noDataAvailable(cause?:string):ErrorFetchingAdvertiser{
    return new ErrorFetchingAdvertiser({
      message: "Advertiser data is empty",
      cause,
    });
  }

  static updateProfile(cause?:string):ErrorFetchingAdvertiser{
    return new ErrorFetchingAdvertiser({
      message: "Something went wrong updating advertiser profile",
      cause,
    });
  }
}
