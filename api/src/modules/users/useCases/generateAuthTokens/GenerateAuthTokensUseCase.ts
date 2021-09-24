import crypto from 'crypto';
import { inject, injectable } from 'tsyringe';

import { IDateProvider } from '@shared/providers/DateProvider/IDateProvider';
import { ITokenManagerProvider } from '@shared/providers/TokenManagerProvider/ITokenManagerProvider';

import { authConfig } from '@config/auth';
import { IRefreshTokensRepository } from '@modules/users/repositories/IRefreshTokensRepository';

type IRequest = {
  userId: string;
};

type IResponse = {
  accessToken: string;
  refreshToken: string;
};

@injectable()
export class GenerateAuthTokensUseCase {
  constructor(
    @inject('RefreshTokensRepository')
    private refreshTokensRepository: IRefreshTokensRepository,
    @inject('DateProvider')
    private dateProvider: IDateProvider,
    @inject('TokenManagerProvider')
    private tokenManagerProvider: ITokenManagerProvider
  ) {}

  async execute({ userId }: IRequest): Promise<IResponse> {
    const lastRefreshToken = await this.refreshTokensRepository.findByUserId(
      userId
    );

    if (lastRefreshToken) {
      await this.refreshTokensRepository.deleteById(lastRefreshToken.id);
    }

    const { accessTokenExpiresIn, accessTokenSecret } = authConfig;

    const accessToken = await this.tokenManagerProvider.sign({
      subject: userId,
      payload: {
        userId,
      },
      expiresIn: accessTokenExpiresIn,
      secret: accessTokenSecret,
    });

    const refreshToken = crypto.randomBytes(24).toString('hex');
    const refreshTokenExpiresIn = this.dateProvider.addDays(
      authConfig.refreshTokenExpiresInDays
    );

    await this.refreshTokensRepository.create({
      token: refreshToken,
      userId,
      expiresIn: refreshTokenExpiresIn,
      accessToken,
    });

    return {
      accessToken,
      refreshToken,
    };
  }
}
