import { AppError } from '@shared/errors/AppError';

export namespace GetUsersByUsername {
  export class UserDoesNotExist extends AppError {
    constructor() {
      super('User does not exist');
    }
  }
}
