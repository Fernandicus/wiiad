export class ErrorFetchingAdvertiser extends Error {
  constructor(params: { message: string; cause?: string }) {
    const { message, cause } = params;
    super(message, { cause });
  }

  static creatingAd(cause?: string): ErrorFetchingAdvertiser {
    return new ErrorFetchingAdvertiser({ message: "Error creating ad", cause });
  }

  static remoingAd(cause?: string): ErrorFetchingAdvertiser {
    return new ErrorFetchingAdvertiser({ message: "Error removing ad", cause });
  }
}
