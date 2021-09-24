import { AppError } from '@shared/errors/AppError';

export namespace DecideInvitationGroupError {
  export class UserDoesNotExist extends AppError {
    constructor() {
      super('User does not exist');
    }
  }

  export class InvitationGroupDoesNotExist extends AppError {
    constructor() {
      super('Invitation group does not exist');
    }
  }

  export class InvitationGroupAlreadyDecided extends AppError {
    constructor() {
      super('Invitation group request already decided');
    }
  }

  export class UserNotAllowedToDecide extends AppError {
    constructor() {
      super('User not allowed to decide this invitation group');
    }
  }

  export class UserAlreadyInsideGroup extends AppError {
    constructor() {
      super('User already inside the group');
    }
  }
}
