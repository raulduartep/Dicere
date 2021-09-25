import { AppError } from '@shared/errors/AppError';

export namespace CancelFriendshipRequestError {
  export class UserDoesNotExist extends AppError {
    constructor() {
      super('User does not exist');
    }
  }

  export class FriendshipRequestDoesNotExist extends AppError {
    constructor() {
      super('Friendship request does not exist');
    }
  }

  export class FriendshipRequestAlreadyDecided extends AppError {
    constructor() {
      super('Friendship request already decided');
    }
  }

  export class FriendshipRequestAlreadyDeleted extends AppError {
    constructor() {
      super('Friendship request already deleted');
    }
  }

  export class UserNotAllowedToDeleted extends AppError {
    constructor() {
      super('User not allowed to delete this friendship request');
    }
  }
}
