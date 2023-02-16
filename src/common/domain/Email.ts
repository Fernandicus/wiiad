
export class Email {
  readonly email;
  constructor(email: string) {
    if (!email) throw new Error("Email can't be empty");
    if (!email.match(RegExp(/.+\@.+\..+/)))
      throw new Error(`'${email} is not a valid Email'`);
    this.email = email.toLowerCase();
  }
}
