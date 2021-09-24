import { AppError } from '@shared/errors/AppError';

export namespace GetUserRoomsError {
  export class UserDoesNotExist extends AppError {
    constructor() {
      super('User does not exist');
    }
  }
}
