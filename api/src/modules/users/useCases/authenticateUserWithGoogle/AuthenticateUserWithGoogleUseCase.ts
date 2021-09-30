import { container, inject, injectable } from 'tsyringe';

import { GoogleOAuthProvider } from '@shared/providers/OAuthProvider/implementations/GoogleOAuthProvider';
import { GenerateUsername } from '@shared/utils/generateUsername';

import { IUserMap, UserMap } from '@modules/users/mappers/UserMap';
import { IUsersRepository } from '@modules/users/repositories/IUsersRepository';

import { GenerateAuthTokensUseCase } from '../generateAuthTokens/GenerateAuthTokensUseCase';
import { AuthenticateUserWithGoogleError } from './AuthenticateUserWithGoogleError';

type IRequest = {
  code: string;
};

type IResponse = {
  user: IUserMap;
  accessToken: string;
  refreshToken: string;
};

@injectable()
export class AuthenticateUserWithGoogleUseCase {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository
  ) {}

  async execute({ code }: IRequest): Promise<IResponse> {
    const googleOAuthProvider = new GoogleOAuthProvider();

    const googleAccessToken = await googleOAuthProvider
      .getToken(code)
      .catch(() => {
        throw new AuthenticateUserWithGoogleError.GoogleErrorGetAccessToken();
      });

    const googleUserProfile = await googleOAuthProvider
      .getUserInfo(googleAccessToken)
      .catch(() => {
        throw new AuthenticateUserWithGoogleError.GoogleErrorGetProfile();
      });

    let user = await this.usersRepository.findByEmail(googleUserProfile.email);

    if (!user) {
      const generateUsername = container.resolve(GenerateUsername);

      const username = await generateUsername.execute(googleUserProfile.name);

      user = await this.usersRepository.create({
        email: googleUserProfile.email,
        name: googleUserProfile.name,
        picture: googleUserProfile.pictureUrl,
        username,
      });
    }

    const generateTokensUseCase = container.resolve(GenerateAuthTokensUseCase);

    const { accessToken, refreshToken } = await generateTokensUseCase.execute({
      userId: user.id,
    });

    return {
      accessToken,
      refreshToken,
      user: UserMap.map(user),
    };
  }
}
