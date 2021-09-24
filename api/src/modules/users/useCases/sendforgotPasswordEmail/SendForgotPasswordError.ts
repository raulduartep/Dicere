import { AppError } from '@shared/errors/AppError';

export namespace SendForgotPasswordError {
  export class UserDoesNotExist extends AppError {
    constructor() {
      super('User does not exist');
    }
  }
}
