export class ErrorSendVerificationEmail extends Error {
  constructor(message: string) {
    super(message);
  }

  static userOrEmailAlreadyExists(
    userName: string,
    email: string
  ): ErrorSendVerificationEmail {
    return new ErrorSendVerificationEmail(
      `The user name '${userName}' or the email '${email}' already exist`
    );
  }

  static userOrEmailDoNotExists(
    userName: string,
    email: string
  ): ErrorSendVerificationEmail {
    return new ErrorSendVerificationEmail(
      `The user name '${userName}' or the email '${email}' do not exist`
    );
  }

  static emailNotExists(email: string): ErrorSendVerificationEmail {
    return new ErrorSendVerificationEmail(`The email '${email}' do not exist`);
  }

  static userNameAlreadyExists(userName: string): ErrorSendVerificationEmail {
    return new ErrorSendVerificationEmail(
      `The user name '${userName}' already exists`
    );
  }

  static emailAlreadyExists(email: string): ErrorSendVerificationEmail {
    return new ErrorSendVerificationEmail(
      `El email '${email}' ya está asignado a un anunciante`
    );
  }
}
