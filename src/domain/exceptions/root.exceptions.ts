
export class ExceptionsDomain extends Error {
    constructor( message: string, ){
        super(message)
        this.name = this.constructor.name
    }
}


export class InvalidEmail extends ExceptionsDomain {
  constructor(email: string) {
    super(`Email ${email} is not valid`);
  }
}


export class InvalidName extends ExceptionsDomain {
  constructor(message: string) {
    super(message);
  }
}





export class InvalidImageFormat extends ExceptionsDomain {


  constructor(message: string) {


    super(message);


  }


}








export class UserAlreadyExists extends ExceptionsDomain {


  constructor(email: string) {


    super(`User with email ${email} already exists`);


  }


}

