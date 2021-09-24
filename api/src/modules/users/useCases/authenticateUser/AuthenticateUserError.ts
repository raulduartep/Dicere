import { AppError } from '@shared/errors/AppError';

export namespace AuthenticateUserError {
  export class EmailOrPassWordIncorrect extends AppError {
    constructor() {
      super('Email or password incorrect', 401);
    }
  }
}
