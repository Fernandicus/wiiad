export class ErrorFetchingAdvertiser extends Error {
  constructor(params: { message: string; cause?: string }) {
    const { message, cause } = params;
    super(message, { cause });
  }

  static gettingAll(cause?: string): ErrorFetchingAdvertiser {
    return new ErrorFetchingAdvertiser({
      message: "Something went wrong getting campaigns",
      cause,
    });
  }
}
