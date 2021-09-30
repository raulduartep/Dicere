import '@shared/container/test';
import faker from 'faker';
import sinon from 'sinon';
import { container } from 'tsyringe';

import { IDateProvider } from '@shared/providers/DateProvider/IDateProvider';
import { IEncoderProvider } from '@shared/providers/EncoderProvider/IEncoderProvider';
import { ITokenManagerProvider } from '@shared/providers/TokenManagerProvider/ITokenManagerProvider';

import { forgotPasswordConfig } from '@config/forgotPassword';
import { IForgotPasswordsRepository } from '@modules/users/repositories/IForgotPasswordsRepository';
import { IUsersRepository } from '@modules/users/repositories/IUsersRepository';

import { ResetPasswordError } from './ResetPasswordError';
import { ResetPasswordUseCase } from './ResetPasswordUseCase';

let usersRepository: IUsersRepository;
let forgotPasswordsRepository: IForgotPasswordsRepository;
let tokenManagerProvider: ITokenManagerProvider;
let dateProvider: IDateProvider;
let encoderProvider: IEncoderProvider;
let resetPasswordUseCase: ResetPasswordUseCase;

describe('Send Forgot Password Mail', () => {
  beforeAll(() => {
    usersRepository = container.resolve('UsersRepository');
    forgotPasswordsRepository = container.resolve('ForgotPasswordsRepository');
    tokenManagerProvider = container.resolve('TokenManagerProvider');
    dateProvider = container.resolve('DateProvider');
    encoderProvider = container.resolve('EncoderProvider');
    resetPasswordUseCase = container.resolve(ResetPasswordUseCase);
  });

  beforeEach(() => {
    sinon.restore();
  });

  it('Should be able to reset a user password', async () => {
    const user = await usersRepository.create({
      email: faker.internet.email(),
      password: faker.internet.password(),
      name: faker.name.findName(),
      username: faker.internet.userName(),
    });

    const token = faker.datatype.uuid();

    const forgotPassword = await forgotPasswordsRepository.create({
      token: await encoderProvider.encode(token),
      userId: user.id,
      expiresIn: dateProvider.addMinutes(forgotPasswordConfig.expiresInMinutes),
    });

    const accessToken = await tokenManagerProvider.sign({
      payload: {
        forgotPasswordId: forgotPassword.id,
      },
      expiresIn: forgotPasswordConfig.expiresIn,
      secret: forgotPasswordConfig.secret,
      subject: user.id,
    });

    await expect(
      resetPasswordUseCase.execute({
        accessToken,
        token,
        password: 'new password',
      })
    ).resolves.not.toThrow();
  });

  it('Should not be able to reset an user password if access token is not valid', async () => {
    const user = await usersRepository.create({
      email: faker.internet.email(),
      password: faker.internet.password(),
      name: faker.name.findName(),
      username: faker.internet.userName(),
    });

    const token = faker.datatype.uuid();

    const forgotPassword = await forgotPasswordsRepository.create({
      token: await encoderProvider.encode(token),
      userId: user.id,
      expiresIn: dateProvider.addMinutes(forgotPasswordConfig.expiresInMinutes),
    });

    const accessToken = await tokenManagerProvider.sign({
      payload: {
        forgotPasswordId: forgotPassword.id,
      },
      expiresIn: forgotPasswordConfig.expiresIn,
      secret: 'wrong secret',
      subject: user.id,
    });

    await expect(
      resetPasswordUseCase.execute({
        accessToken,
        token,
        password: 'new password',
      })
    ).rejects.toEqual(new ResetPasswordError.AccessTokenInvalid());
  });

  it('Should not be able to reset an user password if access token is expired', async () => {
    const user = await usersRepository.create({
      email: faker.internet.email(),
      password: faker.internet.password(),
      name: faker.name.findName(),
      username: faker.internet.userName(),
    });

    const token = faker.datatype.uuid();

    const forgotPassword = await forgotPasswordsRepository.create({
      token: await encoderProvider.encode(token),
      userId: user.id,
      expiresIn: dateProvider.addMinutes(forgotPasswordConfig.expiresInMinutes),
    });

    const accessToken = await tokenManagerProvider.sign({
      payload: {
        forgotPasswordId: forgotPassword.id,
      },
      expiresIn: forgotPasswordConfig.expiresIn,
      secret: forgotPasswordConfig.secret,
      subject: user.id,
    });

    sinon.useFakeTimers(dateProvider.addDays(3));

    await expect(
      resetPasswordUseCase.execute({
        accessToken,
        token,
        password: 'new password',
      })
    ).rejects.toEqual(new ResetPasswordError.AccessTokenInvalid());
  });

  it('Should not be able to reset an user password if forgot password does not exist', async () => {
    const user = await usersRepository.create({
      email: faker.internet.email(),
      password: faker.internet.password(),
      name: faker.name.findName(),
      username: faker.internet.userName(),
    });

    const token = faker.datatype.uuid();

    await forgotPasswordsRepository.create({
      token: await encoderProvider.encode(token),
      userId: user.id,
      expiresIn: dateProvider.addMinutes(forgotPasswordConfig.expiresInMinutes),
    });

    const accessToken = await tokenManagerProvider.sign({
      payload: {
        forgotPasswordId: 'nonexistent forgot password',
      },
      expiresIn: forgotPasswordConfig.expiresIn,
      secret: forgotPasswordConfig.secret,
      subject: user.id,
    });

    await expect(
      resetPasswordUseCase.execute({
        accessToken,
        token,
        password: 'new password',
      })
    ).rejects.toEqual(new ResetPasswordError.ForgotPasswordDoesNotExist());
  });

  it('Should not be able to reset an user password if forgot password is not valid', async () => {
    const user = await usersRepository.create({
      email: faker.internet.email(),
      password: faker.internet.password(),
      name: faker.name.findName(),
      username: faker.internet.userName(),
    });

    const token = faker.datatype.uuid();

    const forgotPassword = await forgotPasswordsRepository.create({
      token: await encoderProvider.encode(token),
      userId: user.id,
      expiresIn: dateProvider.addMinutes(forgotPasswordConfig.expiresInMinutes),
    });

    await forgotPasswordsRepository.invalidate(forgotPassword.id);

    const accessToken = await tokenManagerProvider.sign({
      payload: {
        forgotPasswordId: forgotPassword.id,
      },
      expiresIn: forgotPasswordConfig.expiresIn,
      secret: forgotPasswordConfig.secret,
      subject: user.id,
    });

    await expect(
      resetPasswordUseCase.execute({
        accessToken,
        token,
        password: 'new password',
      })
    ).rejects.toEqual(new ResetPasswordError.ForgotPasswordIsInvalid());
  });

  it('Should not be able to reset an user password if forgot password is expired', async () => {
    const user = await usersRepository.create({
      email: faker.internet.email(),
      password: faker.internet.password(),
      name: faker.name.findName(),
      username: faker.internet.userName(),
    });

    const token = faker.datatype.uuid();

    const forgotPassword = await forgotPasswordsRepository.create({
      token: await encoderProvider.encode(token),
      userId: user.id,
      expiresIn: dateProvider.addMinutes(forgotPasswordConfig.expiresInMinutes),
    });

    const accessToken = await tokenManagerProvider.sign({
      payload: {
        forgotPasswordId: forgotPassword.id,
      },
      expiresIn: '1d',
      secret: forgotPasswordConfig.secret,
      subject: user.id,
    });

    sinon.useFakeTimers(dateProvider.addMinutes(40));

    await expect(
      resetPasswordUseCase.execute({
        accessToken,
        token,
        password: 'new password',
      })
    ).rejects.toEqual(new ResetPasswordError.ForgotPasswordIsExpired());
  });

  it('Should not be able to reset an user password if token is not equal to forgot password token', async () => {
    const user = await usersRepository.create({
      email: faker.internet.email(),
      password: faker.internet.password(),
      name: faker.name.findName(),
      username: faker.internet.userName(),
    });

    const token = faker.datatype.uuid();

    const forgotPassword = await forgotPasswordsRepository.create({
      token: await encoderProvider.encode(token),
      userId: user.id,
      expiresIn: dateProvider.addMinutes(forgotPasswordConfig.expiresInMinutes),
    });

    const accessToken = await tokenManagerProvider.sign({
      payload: {
        forgotPasswordId: forgotPassword.id,
      },
      expiresIn: forgotPasswordConfig.expiresIn,
      secret: forgotPasswordConfig.secret,
      subject: user.id,
    });

    await expect(
      resetPasswordUseCase.execute({
        accessToken,
        token: 'wrong token',
        password: 'new password',
      })
    ).rejects.toEqual(new ResetPasswordError.TokenInvalid());
  });
});
