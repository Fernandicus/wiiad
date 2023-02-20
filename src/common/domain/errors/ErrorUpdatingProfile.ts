export class ErrorUpdatingProfile extends Error {
  constructor(message: string, options?: { cause?: string }) {
    super(message, options);
  }

  static nameAlreadyExist(name: string): ErrorUpdatingProfile {
    return new ErrorUpdatingProfile(`The name ${name} already exist`);
  }

  static emailAlreadyExist(email: string): ErrorUpdatingProfile {
    return new ErrorUpdatingProfile(`The email ${email} already exist`);
  }
}
