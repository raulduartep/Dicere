import { AppError } from '@shared/errors/AppError';

export namespace GetFriendshipsError {
  export class UserDoesNotExist extends AppError {
    constructor() {
      super('User does not exist');
    }
  }
}
