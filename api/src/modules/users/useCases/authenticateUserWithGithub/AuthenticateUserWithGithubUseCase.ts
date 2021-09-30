import { container, inject, injectable } from 'tsyringe';

import { GithubOAuthProvider } from '@shared/providers/OAuthProvider/implementations/GithubOAuthProvider';
import { GenerateUsername } from '@shared/utils/generateUsername';

import { IUserMap, UserMap } from '@modules/users/mappers/UserMap';
import { IUsersRepository } from '@modules/users/repositories/IUsersRepository';

import { GenerateAuthTokensUseCase } from '../generateAuthTokens/GenerateAuthTokensUseCase';
import { AuthenticateUserWithGithubError } from './AuthenticateUserWithGithubError';

type IRequest = {
  code: string;
};

type IResponse = {
  user: IUserMap;
  accessToken: string;
  refreshToken: string;
};

@injectable()
export class AuthenticateUserWithGithubUseCase {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository
  ) {}

  async execute({ code }: IRequest): Promise<IResponse> {
    const githubOAuthProvider = new GithubOAuthProvider();

    const githubAccessToken = await githubOAuthProvider
      .getToken(code)
      .catch(() => {
        throw new AuthenticateUserWithGithubError.GithubErrorGetAccessToken();
      });

    const githubUserProfile = await githubOAuthProvider
      .getUserInfo(githubAccessToken)
      .catch(() => {
        throw new AuthenticateUserWithGithubError.GithubErrorGetProfile();
      });

    let user = await this.usersRepository.findByEmail(githubUserProfile.email);

    if (!user) {
      const generateUsername = container.resolve(GenerateUsername);

      const username = await generateUsername.execute(githubUserProfile.name);

      user = await this.usersRepository.create({
        email: githubUserProfile.email,
        name: githubUserProfile.name,
        picture: githubUserProfile.pictureUrl,
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
