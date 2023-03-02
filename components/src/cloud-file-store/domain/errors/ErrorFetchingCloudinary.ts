export class ErrorFetchingCloudinary extends Error {
  constructor(message: string) {
    super(message);
  }

  static gettingSignedData(): ErrorFetchingCloudinary {
    return new ErrorFetchingCloudinary("Couldnt get signed data");
  }
}
