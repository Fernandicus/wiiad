export class ErrorUpdatingProfile extends Error {
  constructor(message: string) {
    super(message);
  }

  static nameAlreadyExist(name: string): ErrorUpdatingProfile {
    return new ErrorUpdatingProfile(`The name ${name} already exist`);
  }

  static emailAlreadyExist(email: string): ErrorUpdatingProfile {
    return new ErrorUpdatingProfile(`The email ${email} already exist`);
  }
}
