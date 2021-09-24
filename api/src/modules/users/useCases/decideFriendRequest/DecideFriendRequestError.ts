import { AppError } from '@shared/errors/AppError';

export namespace DecidedFriendRequestError {
  export class UserDoesNotExist extends AppError {
    constructor() {
      super('User does not exist');
    }
  }

  export class UserFriendRequestDoesNotExist extends AppError {
    constructor() {
      super('User friend request does not exist');
    }
  }

  export class UserFriendRequestAlreadyDecided extends AppError {
    constructor() {
      super('User friend request already decided');
    }
  }

  export class UserNotAllowedToDecide extends AppError {
    constructor() {
      super('User not allowed to decide this friendship request');
    }
  }
}
