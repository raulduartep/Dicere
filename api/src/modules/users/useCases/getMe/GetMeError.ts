import { AppError } from '@shared/errors/AppError';

export namespace GetMeError {
  export class UserDoesNotExist extends AppError {
    constructor() {
      super('User does not exist');
    }
  }
}
