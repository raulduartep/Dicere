import { AppError } from '@shared/errors/AppError';

export namespace GetPendingsFriendshipsError {
  export class UserDoesNotExist extends AppError {
    constructor() {
      super('User does not exist');
    }
  }
}
