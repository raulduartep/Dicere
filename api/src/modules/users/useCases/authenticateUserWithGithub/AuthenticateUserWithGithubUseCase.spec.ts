import '@shared/container/test';

import faker from 'faker';
import { container } from 'tsyringe';

import { GithubOAuthProvider } from '@shared/providers/OAuthProvider/implementations/GithubOAuthProvider';

import { IUsersRepository } from '@modules/users/repositories/IUsersRepository';

import { AuthenticateUserWithGithubError } from './AuthenticateUserWithGithubError';
import { AuthenticateUserWithGithubUseCase } from './AuthenticateUserWithGithubUseCase';

let usersRepository: IUsersRepository;
let authenticateUserWithGithubUseCase: AuthenticateUserWithGithubUseCase;

describe('Authenticate User With Github Use Case', () => {
  beforeAll(() => {
    usersRepository = container.resolve('UsersRepository');
    authenticateUserWithGithubUseCase = container.resolve(
      AuthenticateUserWithGithubUseCase
    );
  });

  it('Should be able to authenticate a user with github', async () => {
    const user = await usersRepository.create({
      email: 'raul@gmail.com',
      password: faker.internet.password(),
      name: faker.name.findName(),
    });

    const githubOAuthProviderGetTokenSpy = jest.fn(async () => 'mock');

    const githubOAuthProviderGetUserInfoSpy = jest.fn(async () => ({
      email: user.email,
      name: user.name,
      pictureUrl: user.picture,
    }));

    GithubOAuthProvider.prototype.getToken = githubOAuthProviderGetTokenSpy;

    GithubOAuthProvider.prototype.getUserInfo = githubOAuthProviderGetUserInfoSpy;

    const authentication = await authenticateUserWithGithubUseCase.execute({
      code: faker.datatype.uuid(),
    });

    expect(githubOAuthProviderGetTokenSpy).toHaveBeenCalled();
    expect(githubOAuthProviderGetUserInfoSpy).toHaveBeenCalled();
    expect(authentication).toEqual(
      expect.objectContaining({
        user: expect.objectContaining({
          id: user.id,
          email: user.email,
          name: user.name,
          picture: user.picture,
          createdAt: user.createdAt,
          updatedAt: user.updatedAt,
        }),
        accessToken: expect.any(String),
        refreshToken: expect.any(String),
      })
    );
  });

  it('Should be able to authenticate a user with github and create a new user if he does not exist', async () => {
    const user = {
      email: faker.internet.email(),
      name: faker.name.findName(),
      picture: undefined,
    };

    const githubOAuthProviderGetTokenSpy = jest.fn(async () => 'mock');

    const githubOAuthProviderGetUserInfoSpy = jest.fn(async () => ({
      email: user.email,
      name: user.name,
      pictureUrl: user.picture,
    }));

    GithubOAuthProvider.prototype.getToken = githubOAuthProviderGetTokenSpy;

    GithubOAuthProvider.prototype.getUserInfo = githubOAuthProviderGetUserInfoSpy;

    const authentication = await authenticateUserWithGithubUseCase.execute({
      code: faker.datatype.uuid(),
    });

    expect(githubOAuthProviderGetTokenSpy).toHaveBeenCalled();
    expect(githubOAuthProviderGetUserInfoSpy).toHaveBeenCalled();
    expect(authentication).toEqual(
      expect.objectContaining({
        user: expect.objectContaining({
          id: expect.any(String),
          email: user.email,
          name: user.name,
          picture: user.picture,
          createdAt: expect.any(Date),
          updatedAt: expect.any(Date),
        }),
        accessToken: expect.any(String),
        refreshToken: expect.any(String),
      })
    );
  });

  it('Should not be able to authenticate a user with github if there is an error to get user access token', async () => {
    const githubOAuthProviderGetTokenSpy = jest.fn(async () => {
      throw new Error();
    });

    GithubOAuthProvider.prototype.getToken = githubOAuthProviderGetTokenSpy;

    await expect(
      authenticateUserWithGithubUseCase.execute({
        code: faker.datatype.uuid(),
      })
    ).rejects.toEqual(
      new AuthenticateUserWithGithubError.GithubErrorGetAccessToken()
    );
  });

  it('Should not be able to authenticate a user with github if there is an error to get user profile', async () => {
    const githubOAuthProviderGetTokenSpy = jest.fn(async () => 'mock');

    const githubOAuthProviderGetUserInfoSpy = jest.fn(async () => {
      throw new Error();
    });

    GithubOAuthProvider.prototype.getToken = githubOAuthProviderGetTokenSpy;

    GithubOAuthProvider.prototype.getUserInfo = githubOAuthProviderGetUserInfoSpy;

    await expect(
      authenticateUserWithGithubUseCase.execute({
        code: faker.datatype.uuid(),
      })
    ).rejects.toEqual(
      new AuthenticateUserWithGithubError.GithubErrorGetProfile()
    );
  });
});
