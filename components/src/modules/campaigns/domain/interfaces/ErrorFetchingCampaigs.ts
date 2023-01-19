export class ErrorFetchingCampaigns extends Error {
  constructor(params: { message: string; cause?: string }) {
    const { message, cause } = params;
    super(message, { cause });
  }

  static gettingAll(cause?: string): ErrorFetchingCampaigns {
    return new ErrorFetchingCampaigns({
      message: "Something went wrong getting campaigns",
      cause,
    });
  }
}
