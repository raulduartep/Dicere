import '@shared/container/test';
import faker from 'faker';
import { container } from 'tsyringe';

import { IEncoderProvider } from '@shared/providers/EncoderProvider/IEncoderProvider';

import { IRefreshTokensRepository } from '@modules/users/repositories/IRefreshTokensRepository';
import { IUsersRepository } from '@modules/users/repositories/IUsersRepository';

import { AuthenticateUserUseCase } from '../authenticateUser/AuthenticateUserUseCase';
import { RefreshAuthTokensUseCase } from './RefreshAuthTokensUseCase';

let refreshTokenUseCase: RefreshAuthTokensUseCase;
let authenticateUserUseCase: AuthenticateUserUseCase;
let usersRepository: IUsersRepository;
let refreshTokensRepository: IRefreshTokensRepository;
let bcryptEncoderProvider: IEncoderProvider;

describe('Refresh Auth Tokens Use Case', () => {
  beforeAll(() => {
    refreshTokensRepository = container.resolve('RefreshTokensRepository');
    usersRepository = container.resolve('UsersRepository');
    bcryptEncoderProvider = container.resolve('EncoderProvider');
    refreshTokenUseCase = container.resolve(RefreshAuthTokensUseCase);
    authenticateUserUseCase = container.resolve(AuthenticateUserUseCase);
  });

  it('Should be able to refresh access token', async () => {
    const plainPassword = faker.internet.password();
    const hashPassword = await bcryptEncoderProvider.encode(plainPassword);

    const user = await usersRepository.create({
      email: faker.internet.email(),
      name: faker.name.findName(),
      password: hashPassword,
    });

    const authentication = await authenticateUserUseCase.execute({
      email: user.email,
      password: plainPassword,
    });

    const newAuthentication = await refreshTokenUseCase.execute({
      accessToken: authentication.accessToken,
      refreshToken: authentication.refreshToken,
    });

    expect(newAuthentication).toEqual(
      expect.objectContaining({
        accessToken: expect.any(String),
        refreshToken: expect.any(String),
      })
    );
  });

  it('Should to deleted last refresh token', async () => {
    const plainPassword = faker.internet.password();
    const hashPassword = await bcryptEncoderProvider.encode(plainPassword);

    const user = await usersRepository.create({
      email: faker.internet.email(),
      name: faker.name.findName(),
      password: hashPassword,
    });

    const authentication = await authenticateUserUseCase.execute({
      email: user.email,
      password: plainPassword,
    });

    await refreshTokenUseCase.execute({
      accessToken: authentication.accessToken,
      refreshToken: authentication.refreshToken,
    });

    const lastRefreshToken = await refreshTokensRepository.findByRefreshTokenAndAccessToken(
      {
        accessToken: authentication.accessToken,
        refreshToken: authentication.refreshToken,
      }
    );

    expect(lastRefreshToken).toBeUndefined();
  });
});
