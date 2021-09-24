import { AppError } from '@shared/errors/AppError';

export namespace TypingMessageError {
  export class UserDoesNotExist extends AppError {
    constructor() {
      super('User does not exist');
    }
  }

  export class RoomDoesNotExist extends AppError {
    constructor() {
      super('Room does not exist');
    }
  }

  export class UserNotInRoom extends AppError {
    constructor() {
      super('User is not in room ');
    }
  }
}
