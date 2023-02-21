export class ErrorSingingIn extends Error {
    constructor(message: string, options?: { cause?: string }) {
      super(message, options);
    }

  }
  