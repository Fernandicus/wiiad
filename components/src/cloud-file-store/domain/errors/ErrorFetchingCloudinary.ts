export class ErrorFetchingCloudinary extends Error {
  constructor(message: string, options: { cause?: string }) {
    super(message, options);
  }

  static gettingSignedData(cause?: string): ErrorFetchingCloudinary {
    return new ErrorFetchingCloudinary("Couldnt get signed data", { cause });
  }
}
