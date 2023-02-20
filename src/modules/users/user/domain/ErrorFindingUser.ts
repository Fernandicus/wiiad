export class ErrorFindingUser extends Error {
    readonly info;
    constructor(info: string, errorMessage?: string) {
      super(errorMessage);
      this.info = info;
    }

    static byEmail(email:string):ErrorFindingUser{
      return new ErrorFindingUser(`User email ${email} do not exist`)
    }

    static byId(id:string):ErrorFindingUser{
      return new ErrorFindingUser(`User with id ${id} do not exist`)
    }
  }
  