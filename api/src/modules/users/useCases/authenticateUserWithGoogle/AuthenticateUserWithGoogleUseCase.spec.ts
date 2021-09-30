import '@shared/container/test';
import faker from 'faker';
import { container } from 'tsyringe';

import { GoogleOAuthProvider } from '@shared/providers/OAuthProvider/implementations/GoogleOAuthProvider';

import { IUsersRepository } from '@modules/users/repositories/IUsersRepository';

import { AuthenticateUserWithGoogleError } from './AuthenticateUserWithGoogleError';
import { AuthenticateUserWithGoogleUseCase } from './AuthenticateUserWithGoogleUseCase';

let usersRepository: IUsersRepository;
let authenticateUserWithGoogleUseCase: AuthenticateUserWithGoogleUseCase;

describe('Authenticate User With Google Use Case', () => {
  beforeAll(() => {
    usersRepository = container.resolve('UsersRepository');
    authenticateUserWithGoogleUseCase = container.resolve(
      AuthenticateUserWithGoogleUseCase
    );
  });

  it('Should be able to authenticate a user with google', async () => {
    const user = await usersRepository.create({
      email: faker.internet.email(),
      password: faker.internet.password(),
      name: faker.name.findName(),
      username: faker.internet.userName(),
    });

    const googleOAuthProviderGetTokenSpy = jest.fn(async () => 'mock');

    const googleOAuthProviderGetUserInfoSpy = jest.fn(async () => ({
      email: user.email,
      name: user.name,
      pictureUrl: user.picture,
    }));

    GoogleOAuthProvider.prototype.getToken = googleOAuthProviderGetTokenSpy;

    GoogleOAuthProvider.prototype.getUserInfo = googleOAuthProviderGetUserInfoSpy;

    const authentication = await authenticateUserWithGoogleUseCase.execute({
      code: faker.datatype.uuid(),
    });

    expect(googleOAuthProviderGetTokenSpy).toHaveBeenCalled();
    expect(googleOAuthProviderGetUserInfoSpy).toHaveBeenCalled();
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

    const googleOAuthProviderGetTokenSpy = jest.fn(async () => 'mock');

    const googleOAuthProviderGetUserInfoSpy = jest.fn(async () => ({
      email: user.email,
      name: user.name,
      pictureUrl: user.picture,
    }));

    GoogleOAuthProvider.prototype.getToken = googleOAuthProviderGetTokenSpy;

    GoogleOAuthProvider.prototype.getUserInfo = googleOAuthProviderGetUserInfoSpy;

    const authentication = await authenticateUserWithGoogleUseCase.execute({
      code: faker.datatype.uuid(),
    });

    expect(googleOAuthProviderGetTokenSpy).toHaveBeenCalled();
    expect(googleOAuthProviderGetUserInfoSpy).toHaveBeenCalled();
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
    const googleOAuthProviderGetTokenSpy = jest.fn(async () => {
      throw new Error();
    });

    GoogleOAuthProvider.prototype.getToken = googleOAuthProviderGetTokenSpy;

    await expect(
      authenticateUserWithGoogleUseCase.execute({
        code: faker.datatype.uuid(),
      })
    ).rejects.toEqual(
      new AuthenticateUserWithGoogleError.GoogleErrorGetAccessToken()
    );
  });

  it('Should not be able to authenticate a user with github if there is an error to get user profile', async () => {
    const googleOAuthProviderGetTokenSpy = jest.fn(async () => 'mock');

    const googleOAuthProviderGetUserInfoSpy = jest.fn(async () => {
      throw new Error();
    });

    GoogleOAuthProvider.prototype.getToken = googleOAuthProviderGetTokenSpy;

    GoogleOAuthProvider.prototype.getUserInfo = googleOAuthProviderGetUserInfoSpy;

    await expect(
      authenticateUserWithGoogleUseCase.execute({
        code: faker.datatype.uuid(),
      })
    ).rejects.toEqual(
      new AuthenticateUserWithGoogleError.GoogleErrorGetProfile()
    );
  });
});
