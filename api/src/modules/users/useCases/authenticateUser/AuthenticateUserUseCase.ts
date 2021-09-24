import { container, inject, injectable } from 'tsyringe';

import { IEncoderProvider } from '@shared/providers/EncoderProvider/IEncoderProvider';

import { IUserMap, UserMap } from '@modules/users/mappers/UserMap';
import { IUsersRepository } from '@modules/users/repositories/IUsersRepository';

import { GenerateAuthTokensUseCase } from '../generateAuthTokens/GenerateAuthTokensUseCase';
import { AuthenticateUserError } from './AuthenticateUserError';

type IRequest = {
  email: string;
  password: string;
};

type IResponse = {
  user: IUserMap;
  accessToken: string;
  refreshToken: string;
};

@injectable()
export class AuthenticateUserUseCase {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
    @inject('EncoderProvider')
    private encoderProvider: IEncoderProvider
  ) {}

  async execute({ email, password }: IRequest): Promise<IResponse> {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new AuthenticateUserError.EmailOrPassWordIncorrect();
    }

    if (!user.password) {
      throw new AuthenticateUserError.EmailOrPassWordIncorrect();
    }

    const comparePassword = await this.encoderProvider.compare(
      password,
      user.password
    );

    if (!comparePassword) {
      throw new AuthenticateUserError.EmailOrPassWordIncorrect();
    }

    const generateTokensUseCase = container.resolve(GenerateAuthTokensUseCase);

    const { accessToken, refreshToken } = await generateTokensUseCase.execute({
      userId: user.id,
    });

    return {
      user: UserMap.map(user),
      accessToken,
      refreshToken,
    };
  }
}
