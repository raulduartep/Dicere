import '@shared/container/test';
import faker from 'faker';
import sinon from 'sinon';
import { container } from 'tsyringe';

import { IDateProvider } from '@shared/providers/DateProvider/IDateProvider';
import { IEncoderProvider } from '@shared/providers/EncoderProvider/IEncoderProvider';
import { ITokenManagerProvider } from '@shared/providers/TokenManagerProvider/ITokenManagerProvider';

import { verificationUserConfig } from '@config/verificationUser';
import { IUserRequestsRepository } from '@modules/users/repositories/IUserRequestsRepository';
import { IVerificationUsersRepository } from '@modules/users/repositories/IVerificationUsersRepository';

import { VerifyUserError } from './VerifyUserError';
import { VerifyUserUseCase } from './VerifyUserUseCase';

let userRequestsRepository: IUserRequestsRepository;
let verificationUsersRepository: IVerificationUsersRepository;
let tokenManagerProvider: ITokenManagerProvider;
let dateProvider: IDateProvider;
let encoderProvider: IEncoderProvider;
let verifyUserUseCase: VerifyUserUseCase;

describe('Send Forgot Password Mail', () => {
  beforeAll(() => {
    verificationUsersRepository = container.resolve(
      'VerificationUsersRepository'
    );
    userRequestsRepository = container.resolve('UserRequestsRepository');
    tokenManagerProvider = container.resolve('TokenManagerProvider');
    dateProvider = container.resolve('DateProvider');
    encoderProvider = container.resolve('EncoderProvider');
    verifyUserUseCase = container.resolve(VerifyUserUseCase);
  });

  afterEach(() => {
    sinon.restore();
  });

  it('Should be able to verify an user', async () => {
    const userRequest = await userRequestsRepository.create({
      email: faker.internet.email(),
      password: faker.internet.password(),
      name: faker.name.findName(),
    });

    const token = faker.datatype.uuid();

    const verificationUser = await verificationUsersRepository.create({
      token: await encoderProvider.encode(token),
      userRequestId: userRequest.id,
      expiresIn: dateProvider.addDays(verificationUserConfig.expiresInDays),
    });

    const accessToken = await tokenManagerProvider.sign({
      payload: {
        verificationUserId: verificationUser.id,
      },
      expiresIn: verificationUserConfig.expiresIn,
      secret: verificationUserConfig.secret,
      subject: verificationUser.id,
    });

    const user = await verifyUserUseCase.execute({
      accessToken,
      token,
    });

    expect(user).toEqual(
      expect.objectContaining({
        email: userRequest.email,
        name: userRequest.name,
        createdAt: userRequest.createdAt,
      })
    );
  });

  it('Should not be able to verify an user if access token is not valid', async () => {
    const userRequest = await userRequestsRepository.create({
      email: faker.internet.email(),
      password: faker.internet.password(),
      name: faker.name.findName(),
    });

    const token = faker.datatype.uuid();

    const verificationUser = await verificationUsersRepository.create({
      token: await encoderProvider.encode(token),
      userRequestId: userRequest.id,
      expiresIn: dateProvider.addDays(verificationUserConfig.expiresInDays),
    });

    const accessToken = await tokenManagerProvider.sign({
      payload: {
        verificationUserId: verificationUser.id,
      },
      expiresIn: verificationUserConfig.expiresIn,
      secret: 'wrong secret',
      subject: verificationUser.id,
    });

    await expect(
      verifyUserUseCase.execute({
        accessToken,
        token,
      })
    ).rejects.toEqual(new VerifyUserError.AccessTokenInvalid());
  });

  it('Should not be able to verify an user if access token is expired', async () => {
    const userRequest = await userRequestsRepository.create({
      email: faker.internet.email(),
      password: faker.internet.password(),
      name: faker.name.findName(),
    });

    const token = faker.datatype.uuid();

    const verificationUser = await verificationUsersRepository.create({
      token: await encoderProvider.encode(token),
      userRequestId: userRequest.id,
      expiresIn: dateProvider.addDays(verificationUserConfig.expiresInDays),
    });

    const accessToken = await tokenManagerProvider.sign({
      payload: {
        verificationUserId: verificationUser.id,
      },
      expiresIn: verificationUserConfig.expiresIn,
      secret: verificationUserConfig.secret,
      subject: verificationUser.id,
    });

    sinon.useFakeTimers(dateProvider.addDays(5));

    await expect(
      verifyUserUseCase.execute({
        accessToken,
        token,
      })
    ).rejects.toEqual(new VerifyUserError.AccessTokenInvalid());
  });

  it('Should not be able to verify an user if verification user does not exist', async () => {
    const userRequest = await userRequestsRepository.create({
      email: faker.internet.email(),
      password: faker.internet.password(),
      name: faker.name.findName(),
    });

    const token = faker.datatype.uuid();

    const verificationUser = await verificationUsersRepository.create({
      token: await encoderProvider.encode(token),
      userRequestId: userRequest.id,
      expiresIn: dateProvider.addDays(verificationUserConfig.expiresInDays),
    });

    const accessToken = await tokenManagerProvider.sign({
      payload: {
        verificationUserId: 'nonexistent verification user',
      },
      expiresIn: verificationUserConfig.expiresIn,
      secret: verificationUserConfig.secret,
      subject: verificationUser.id,
    });

    await expect(
      verifyUserUseCase.execute({
        accessToken,
        token,
      })
    ).rejects.toEqual(new VerifyUserError.VerificationUserDoesNotExist());
  });

  it('Should not be able to verify an user if verification user is expired', async () => {
    const userRequest = await userRequestsRepository.create({
      email: faker.internet.email(),
      password: faker.internet.password(),
      name: faker.name.findName(),
    });

    const token = faker.datatype.uuid();

    const verificationUser = await verificationUsersRepository.create({
      token: await encoderProvider.encode(token),
      userRequestId: userRequest.id,
      expiresIn: dateProvider.addDays(verificationUserConfig.expiresInDays),
    });

    const accessToken = await tokenManagerProvider.sign({
      payload: {
        verificationUserId: verificationUser.id,
      },
      expiresIn: '30d',
      secret: verificationUserConfig.secret,
      subject: verificationUser.id,
    });

    sinon.useFakeTimers(dateProvider.addDays(5));

    await expect(
      verifyUserUseCase.execute({
        accessToken,
        token,
      })
    ).rejects.toEqual(new VerifyUserError.VerificationUserIsExpired());
  });

  it('Should not be able to verify an user if token is not equal to forgot password token', async () => {
    const userRequest = await userRequestsRepository.create({
      email: faker.internet.email(),
      password: faker.internet.password(),
      name: faker.name.findName(),
    });

    const token = faker.datatype.uuid();

    const verificationUser = await verificationUsersRepository.create({
      token: await encoderProvider.encode(token),
      userRequestId: userRequest.id,
      expiresIn: dateProvider.addDays(verificationUserConfig.expiresInDays),
    });
    const accessToken = await tokenManagerProvider.sign({
      payload: {
        verificationUserId: verificationUser.id,
      },
      expiresIn: verificationUserConfig.expiresIn,
      secret: verificationUserConfig.secret,
      subject: verificationUser.id,
    });

    await expect(
      verifyUserUseCase.execute({
        accessToken,
        token: 'wrong token',
      })
    ).rejects.toEqual(new VerifyUserError.TokenInvalid());
  });
});
