import '@shared/container/test';
import faker from 'faker';
import { container } from 'tsyringe';

import { IEncoderProvider } from '@shared/providers/EncoderProvider/IEncoderProvider';

import { IUsersRepository } from '@modules/users/repositories/IUsersRepository';

import { AuthenticateUserError } from './AuthenticateUserError';
import { AuthenticateUserUseCase } from './AuthenticateUserUseCase';

let usersRepository: IUsersRepository;
let encoderProvider: IEncoderProvider;
let authenticateUserUseCase: AuthenticateUserUseCase;

describe('Authenticate User Use Case', () => {
  beforeAll(() => {
    usersRepository = container.resolve('UsersRepository');
    authenticateUserUseCase = container.resolve(AuthenticateUserUseCase);
    encoderProvider = container.resolve('EncoderProvider');
  });

  it('Should be able to authenticate user', async () => {
    const plainPassword = faker.internet.password();

    const user = await usersRepository.create({
      email: faker.internet.email(),
      name: faker.name.findName(),
      password: await encoderProvider.encode(plainPassword),
    });

    const authentication = await authenticateUserUseCase.execute({
      email: user.email,
      password: plainPassword,
    });

    expect(authentication).toEqual(
      expect.objectContaining({
        user: expect.objectContaining({
          id: user.id,
          email: user.email,
          name: user.name,
          createdAt: user.createdAt,
          updatedAt: user.updatedAt,
        }),
        accessToken: expect.any(String),
        refreshToken: expect.any(String),
      })
    );
  });

  it('Should not be able to authenticate user if user does not exist', async () => {
    await expect(
      authenticateUserUseCase.execute({
        email: 'nonexistent email',
        password: 'any password',
      })
    ).rejects.toEqual(new AuthenticateUserError.EmailOrPassWordIncorrect());
  });

  it('Should not be able to authenticate user if password is wrong', async () => {
    const plainPassword = faker.internet.password();

    const user = await usersRepository.create({
      email: faker.internet.email(),
      name: faker.name.findName(),
      password: await encoderProvider.encode(plainPassword),
    });

    expect(
      authenticateUserUseCase.execute({
        email: user.email,
        password: 'wrong password',
      })
    ).rejects.toEqual(new AuthenticateUserError.EmailOrPassWordIncorrect());
  });
});
