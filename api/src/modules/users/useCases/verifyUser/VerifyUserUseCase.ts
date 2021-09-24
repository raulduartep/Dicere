import { inject, injectable } from 'tsyringe';

import { IDateProvider } from '@shared/providers/DateProvider/IDateProvider';
import { IEncoderProvider } from '@shared/providers/EncoderProvider/IEncoderProvider';
import { ITokenManagerProvider } from '@shared/providers/TokenManagerProvider/ITokenManagerProvider';

import { verificationUserConfig } from '@config/verificationUser';
import { IUserRequestsRepository } from '@modules/users/repositories/IUserRequestsRepository';
import { IUsersRepository } from '@modules/users/repositories/IUsersRepository';
import { IVerificationUsersRepository } from '@modules/users/repositories/IVerificationUsersRepository';

import { VerifyUserError } from './VerifyUserError';

type IRequest = {
  accessToken: string;
  token: string;
};

type IAccessTokenPayload = {
  verificationUserId: string;
};

@injectable()
export class VerifyUserUseCase {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('UserRequestsRepository')
    private userRequestsRepository: IUserRequestsRepository,

    @inject('VerificationUsersRepository')
    private verificationsUsersRepository: IVerificationUsersRepository,

    @inject('DateProvider')
    private dateProvider: IDateProvider,

    @inject('TokenManagerProvider')
    private tokenManagerProvider: ITokenManagerProvider,

    @inject('EncoderProvider')
    private encoderProvider: IEncoderProvider
  ) {}

  async execute({ token, accessToken }: IRequest): Promise<void> {
    const { verificationUserId } = await this.tokenManagerProvider
      .verify<IAccessTokenPayload>({
        secret: verificationUserConfig.secret,
        token: accessToken,
      })
      .catch(() => {
        throw new VerifyUserError.AccessTokenInvalid();
      });

    const verificationUser = await this.verificationsUsersRepository.findById(
      verificationUserId
    );

    if (!verificationUser) {
      throw new VerifyUserError.VerificationUserDoesNotExist();
    }

    if (
      this.dateProvider.getDate(verificationUser.expiresIn) <
      this.dateProvider.dateNow()
    ) {
      throw new VerifyUserError.VerificationUserIsExpired();
    }

    const comparationTokens = await this.encoderProvider.compare(
      token,
      verificationUser.token
    );

    if (!comparationTokens) {
      throw new VerifyUserError.TokenInvalid();
    }

    const userRequest = await this.userRequestsRepository.findById(
      verificationUser.userRequestId
    );

    await this.usersRepository.create({
      email: userRequest.email,
      name: userRequest.name,
      password: userRequest.password,
      createdAt: userRequest.createdAt,
    });

    await this.userRequestsRepository.deleteAllByEmail(userRequest.email);
  }
}
