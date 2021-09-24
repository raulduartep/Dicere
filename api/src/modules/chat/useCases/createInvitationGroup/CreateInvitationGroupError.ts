import { AppError } from '@shared/errors/AppError';

export namespace CreateInvitationGroupError {
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

  export class GroupDoesNotExist extends AppError {
    constructor() {
      super('Group does not exist');
    }
  }

  export class RoomIsNotGroup extends AppError {
    constructor() {
      super('Room is not a group');
    }
  }

  export class AlreadyExistUndecided extends AppError {
    constructor() {
      super(
        'Already exist a undecided invitation from this user to the friend for this group'
      );
    }
  }

  export class FriendIsAlreadyInsideGroup extends AppError {
    constructor() {
      super('Friend is already inside the group');
    }
  }

  export class UserNotAllowed extends AppError {
    constructor() {
      super('User not allowed to send invitation');
    }
  }

  export class UserSameFriend extends AppError {
    constructor() {
      super('User is the same as friend');
    }
  }
}
