import { inject, injectable } from 'tsyringe';

import { IDateProvider } from '@shared/providers/DateProvider/IDateProvider';
import { IEncoderProvider } from '@shared/providers/EncoderProvider/IEncoderProvider';
import { ITokenManagerProvider } from '@shared/providers/TokenManagerProvider/ITokenManagerProvider';

import { forgotPasswordConfig } from '@config/forgotPassword';
import { IForgotPasswordsRepository } from '@modules/users/repositories/IForgotPasswordsRepository';
import { IUsersRepository } from '@modules/users/repositories/IUsersRepository';

import { ResetPasswordError } from './ResetPasswordError';

type IRequest = {
  token: string;
  accessToken: string;
  password: string;
};

type IAccessTokenPayload = {
  forgotPasswordId: string;
};

@injectable()
export class ResetPasswordUseCase {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('ForgotPasswordsRepository')
    private forgotPasswordsRepository: IForgotPasswordsRepository,

    @inject('DateProvider')
    private dateProvider: IDateProvider,

    @inject('TokenManagerProvider')
    private tokenManagerProvider: ITokenManagerProvider,

    @inject('EncoderProvider')
    private encoderProvider: IEncoderProvider
  ) {}

  async execute({ accessToken, token, password }: IRequest): Promise<void> {
    const { forgotPasswordId } = await this.tokenManagerProvider
      .verify<IAccessTokenPayload>({
        secret: forgotPasswordConfig.secret,
        token: accessToken,
      })
      .catch(() => {
        throw new ResetPasswordError.AccessTokenInvalid();
      });

    const forgotPassword = await this.forgotPasswordsRepository.findById(
      forgotPasswordId
    );

    if (!forgotPassword) {
      throw new ResetPasswordError.ForgotPasswordDoesNotExist();
    }

    const user = await this.usersRepository.findById(forgotPassword.userId);

    if (!user) {
      throw new ResetPasswordError.UserDoesNotExist();
    }

    if (!forgotPassword.isValid) {
      throw new ResetPasswordError.ForgotPasswordIsInvalid();
    }

    if (
      this.dateProvider.getDate(forgotPassword.expiresIn) <
      this.dateProvider.dateNow()
    ) {
      throw new ResetPasswordError.ForgotPasswordIsExpired();
    }

    const comparationTokens = await this.encoderProvider.compare(
      token,
      forgotPassword.token
    );

    if (!comparationTokens) {
      throw new ResetPasswordError.TokenInvalid();
    }

    const hashNewPassword = await this.encoderProvider.encode(password);

    await this.usersRepository.resetPassword({
      id: user.id,
      password: hashNewPassword,
    });
  }
}
