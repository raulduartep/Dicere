import { AppError } from '@shared/errors/AppError';

export namespace GetMessagesError {
  export class UserDoesNotExist extends AppError {
    constructor() {
      super('User does not exist');
    }
  }

  export class UserIsNotInRoom extends AppError {
    constructor() {
      super('User is not in room');
    }
  }

  export class RoomDoesNotExist extends AppError {
    constructor() {
      super('Room does not exist');
    }
  }
}
