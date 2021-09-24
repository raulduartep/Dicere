import { AppError } from '@shared/errors/AppError';

export namespace CreateFriendshipRequestError {
  export class UserDoesNotExist extends AppError {
    constructor() {
      super('User does not exist');
    }
  }

  export class FriendDoesNotExist extends AppError {
    constructor() {
      super('Friend does not exist');
    }
  }

  export class AlreadyExistUndecided extends AppError {
    constructor() {
      super('Already exist a undecided friend request');
    }
  }

  export class UsersAreAlreadyFriends extends AppError {
    constructor() {
      super('Users are already friends');
    }
  }

  export class UserSameFriend extends AppError {
    constructor() {
      super('User is the same as friend');
    }
  }
}
