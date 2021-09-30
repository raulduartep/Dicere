import crypto from 'crypto';
import { inject, injectable } from 'tsyringe';

import { IDateProvider } from '@shared/providers/DateProvider/IDateProvider';
import { IEncoderProvider } from '@shared/providers/EncoderProvider/IEncoderProvider';
import { IHTMLProvider } from '@shared/providers/HTMLProvider/IHTMLProvider';
import { IMailProvider } from '@shared/providers/MailProvider/IMailProvider';
import { ITokenManagerProvider } from '@shared/providers/TokenManagerProvider/ITokenManagerProvider';
import {
  ForgotPasswordVariables,
  forgotPasswordEmailConfig,
} from '@shared/views/emails/forgotPasswordEmailConfig';

import { forgotPasswordConfig } from '@config/forgotPassword';
import { IForgotPassword } from '@modules/users/entities/IForgotPassword';
import { IForgotPasswordsRepository } from '@modules/users/repositories/IForgotPasswordsRepository';
import { IUsersRepository } from '@modules/users/repositories/IUsersRepository';

import { SendForgotPasswordError } from './SendForgotPasswordError';

type IRequest = {
  email: string;
};

@injectable()
export class SendForgotPasswordUseCase {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('ForgotPasswordsRepository')
    private forgotPasswordsRepository: IForgotPasswordsRepository,

    @inject('DateProvider')
    private dateProvider: IDateProvider,

    @inject('MailProvider')
    private mailProvider: IMailProvider,

    @inject('EncoderProvider')
    private encoderProvider: IEncoderProvider,

    @inject('HTMLProvider')
    private htmlProvider: IHTMLProvider,

    @inject('TokenManagerProvider')
    private tokemManagerProvider: ITokenManagerProvider
  ) {}

  async execute({ email }: IRequest): Promise<IForgotPassword> {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new SendForgotPasswordError.UserDoesNotExist();
    }

    const forgotPasswordAlreadyExists = await this.forgotPasswordsRepository.findValidByUserId(
      user.id
    );

    if (forgotPasswordAlreadyExists) {
      await this.forgotPasswordsRepository.invalidate(
        forgotPasswordAlreadyExists.id
      );
    }

    const forgotPasswordToken = crypto.randomBytes(32).toString('hex');

    const forgotPasswordHash = await this.encoderProvider.encode(
      forgotPasswordToken
    );

    const expiresInDate = this.dateProvider.addMinutes(
      forgotPasswordConfig.expiresInMinutes
    );

    const forgotPassword = await this.forgotPasswordsRepository.create({
      token: forgotPasswordHash,
      userId: user.id,
      expiresIn: expiresInDate,
    });

    const forgotPasswordAccessToken = await this.tokemManagerProvider.sign({
      expiresIn: forgotPasswordConfig.expiresIn,
      payload: {
        forgotPasswordId: forgotPassword.id,
      },
      secret: forgotPasswordConfig.secret,
      subject: user.id,
    });

    const link = `${process.env.FORGOT_MAIL_URL}?token=${forgotPasswordToken}&access_token=${forgotPasswordAccessToken}`;

    const html = await this.htmlProvider.create<ForgotPasswordVariables>({
      path: forgotPasswordEmailConfig.path,
      variables: {
        link,
        email,
      },
    });

    await this.mailProvider.sendMail({
      html,
      subject: forgotPasswordEmailConfig.subject,
      to: email,
    });

    return forgotPassword;
  }
}
