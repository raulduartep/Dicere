import { AppError } from '@shared/errors/AppError';

export namespace CreateRoomUserError {
  export class UserDoesNotExist extends AppError {
    constructor() {
      super('User does not exist');
    }
  }

  export class UserAlreadyInRoom extends AppError {
    constructor() {
      super('User is already in room');
    }
  }
  export class RoomDoesNotExist extends AppError {
    constructor() {
      super('Room does not exist');
    }
  }
}
