import crypto from 'crypto';
import { inject, injectable } from 'tsyringe';

import { IDateProvider } from '@shared/providers/DateProvider/IDateProvider';
import { ITokenManagerProvider } from '@shared/providers/TokenManagerProvider/ITokenManagerProvider';

import { authConfig } from '@config/auth';
import { IUserMap, UserMap } from '@modules/users/mappers/UserMap';
import { IRefreshTokensRepository } from '@modules/users/repositories/IRefreshTokensRepository';
import { IUsersRepository } from '@modules/users/repositories/IUsersRepository';

import { RefreshAuthTokensError } from './RefreshAuthTokensError';

type IRequest = {
  accessToken: string;
  refreshToken: string;
};

type IResponse = {
  accessToken: string;
  refreshToken: string;
  user: IUserMap;
};

@injectable()
export class RefreshAuthTokensUseCase {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('RefreshTokensRepository')
    private refreshTokensRepository: IRefreshTokensRepository,

    @inject('TokenManagerProvider')
    private tokenManagerProvider: ITokenManagerProvider,

    @inject('DateProvider')
    private dateProvider: IDateProvider
  ) {}

  async execute(receivedData: IRequest): Promise<IResponse> {
    const refreshToken = await this.refreshTokensRepository.findByRefreshTokenAndAccessToken(
      {
        refreshToken: receivedData.refreshToken,
        accessToken: receivedData.accessToken,
      }
    );

    if (!refreshToken) {
      throw new RefreshAuthTokensError.InvalidRefreshToken();
    }

    const user = await this.usersRepository.findById(refreshToken.userId);

    await this.refreshTokensRepository.deleteById(refreshToken.id);

    const { accessTokenExpiresIn, accessTokenSecret } = authConfig;

    const newAccessToken = await this.tokenManagerProvider.sign({
      payload: {
        userId: user.id,
      },
      subject: user.id,
      expiresIn: accessTokenExpiresIn,
      secret: accessTokenSecret,
    });

    const newRefreshToken = crypto.randomBytes(24).toString('hex');
    const refreshTokenExpiresIn = this.dateProvider.addDays(
      authConfig.refreshTokenExpiresInDays
    );

    await this.refreshTokensRepository.create({
      token: newRefreshToken,
      userId: user.id,
      expiresIn: refreshTokenExpiresIn,
      accessToken: newAccessToken,
    });

    return {
      accessToken: newAccessToken,
      refreshToken: newRefreshToken,
      user: UserMap.map(user),
    };
  }
}
