import crypto from 'crypto';
import { container, inject, injectable } from 'tsyringe';

import { IDateProvider } from '@shared/providers/DateProvider/IDateProvider';
import { IEncoderProvider } from '@shared/providers/EncoderProvider/IEncoderProvider';
import { IHTMLProvider } from '@shared/providers/HTMLProvider/IHTMLProvider';
import { IMailProvider } from '@shared/providers/MailProvider/IMailProvider';
import { ITokenManagerProvider } from '@shared/providers/TokenManagerProvider/ITokenManagerProvider';
import { GenerateUsername } from '@shared/utils/generateUsername';
import {
  verificationUserEmailConfig,
  VerificationUserVariables,
} from '@shared/views/emails/VerificationUserEmailConfig';

import { verificationUserConfig } from '@config/verificationUser';
import { IUserRequest } from '@modules/users/entities/IUserRequest';
import { IVerificationUser } from '@modules/users/entities/IVerificationUser';
import { IUserRequestsRepository } from '@modules/users/repositories/IUserRequestsRepository';
import { IUsersRepository } from '@modules/users/repositories/IUsersRepository';
import { IVerificationUsersRepository } from '@modules/users/repositories/IVerificationUsersRepository';

import { CreateUserRequestError } from './CreateUserRequestError';

type IRequest = {
  email: string;
  password: string;
  name: string;
};

type IResponse = {
  userRequest: IUserRequest;
  verificationUser: IVerificationUser;
};

@injectable()
export class CreateUserRequestUseCase {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('UserRequestsRepository')
    private userRequestsRepository: IUserRequestsRepository,

    @inject('VerificationUsersRepository')
    private verificationUsersRepository: IVerificationUsersRepository,

    @inject('EncoderProvider')
    private encoderProvider: IEncoderProvider,

    @inject('MailProvider')
    private mailProvider: IMailProvider,

    @inject('HTMLProvider')
    private htmlProvider: IHTMLProvider,

    @inject('DateProvider')
    private dateProvider: IDateProvider,

    @inject('TokenManagerProvider')
    private tokenManagerProvider: ITokenManagerProvider
  ) {}

  async execute({ password, email, name }: IRequest): Promise<IResponse> {
    const userWithEmailAlredyExists = await this.usersRepository.findByEmail(
      email
    );

    if (userWithEmailAlredyExists) {
      throw new CreateUserRequestError.EmailAlreadyExists();
    }

    const hashedPassword = await this.encoderProvider.encode(password);

    const generateUsername = container.resolve(GenerateUsername);

    const username = await generateUsername.execute(name);

    const userRequest = await this.userRequestsRepository.create({
      name,
      email,
      password: hashedPassword,
      username,
    });

    const verificationUserToken = crypto.randomBytes(32).toString('hex');

    const verificationUserHash = await this.encoderProvider.encode(
      verificationUserToken
    );

    const verificationUser = await this.verificationUsersRepository.create({
      expiresIn: this.dateProvider.addDays(
        verificationUserConfig.expiresInDays
      ),
      token: verificationUserHash,
      userRequestId: userRequest.id,
    });

    const verificationUserAccessToken = await this.tokenManagerProvider.sign({
      expiresIn: verificationUserConfig.expiresIn,
      payload: {
        verificationUserId: verificationUser.id,
      },
      secret: verificationUserConfig.secret,
      subject: verificationUser.id,
    });

    const link = `${process.env.VERIFICATION_USER_URL}?token=${verificationUserToken}&access_token=${verificationUserAccessToken}`;

    const html = await this.htmlProvider.create<VerificationUserVariables>({
      path: verificationUserEmailConfig.path,
      variables: {
        email,
        link,
      },
    });

    await this.mailProvider.sendMail({
      to: email,
      html,
      subject: verificationUserEmailConfig.subject,
    });

    return {
      userRequest,
      verificationUser,
    };
  }
}
