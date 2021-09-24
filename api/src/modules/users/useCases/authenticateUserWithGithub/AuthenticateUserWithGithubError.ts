import { AppError } from '@shared/errors/AppError';

export namespace AuthenticateUserWithGithubError {
  export class GithubErrorGetAccessToken extends AppError {
    constructor() {
      super('Error to get github user access token ', 401);
    }
  }

  export class GithubErrorGetProfile extends AppError {
    constructor() {
      super('Error to get github user profile', 401);
    }
  }
}
