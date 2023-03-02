export class ErrorFetchingAdvertiser extends Error {
  constructor(message: string) {
    super(message);
  }

  static creatingAd(): ErrorFetchingAdvertiser {
    return new ErrorFetchingAdvertiser("Error creating ad");
  }

  static remoingAd(): ErrorFetchingAdvertiser {
    return new ErrorFetchingAdvertiser("Error removing ad");
  }
}
