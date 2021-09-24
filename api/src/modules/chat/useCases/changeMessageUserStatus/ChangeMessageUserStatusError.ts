import { AppError } from '@shared/errors/AppError';

export namespace ChangeMessageUserStatusError {
  export class UserDoesNotExist extends AppError {
    constructor() {
      super('User does not exist');
    }
  }

  export class MessageDoesNotExist extends AppError {
    constructor() {
      super('Message does not exist');
    }
  }

  export class UserIsNotInRoom extends AppError {
    constructor() {
      super('User is not in room');
    }
  }
}
