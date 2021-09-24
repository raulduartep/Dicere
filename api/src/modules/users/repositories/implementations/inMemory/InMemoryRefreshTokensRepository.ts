import { ICreateRefreshTokenDTO } from '@modules/users/dtos/ICreateRefreshTokenDTO';
import { InMemoryRefreshToken } from '@modules/users/entities/implementations/inMemory/InMemoryRefreshToken';
import { IRefreshToken } from '@modules/users/entities/IRefreshToken';

import { IRefreshTokensRepository } from '../../IRefreshTokensRepository';

export class InMemoryRefreshTokensRepository
  implements IRefreshTokensRepository {
  private refreshTokens: InMemoryRefreshToken[] = [];

  async create(data: ICreateRefreshTokenDTO): Promise<InMemoryRefreshToken> {
    const refreshToken = new InMemoryRefreshToken(data);

    this.refreshTokens.push(refreshToken);

    return refreshToken;
  }

  async findByRefreshTokenAndAccessToken({
    refreshToken,
    accessToken,
  }: {
    accessToken: string;
    refreshToken: string;
  }): Promise<IRefreshToken> {
    const refreshTokenData = this.refreshTokens.find(
      refreshTokenUnit =>
        refreshTokenUnit.token === refreshToken &&
        refreshTokenUnit.accessToken === accessToken
    );

    return refreshTokenData;
  }

  async findByUserId(userId: string): Promise<InMemoryRefreshToken> {
    const refreshToken = this.refreshTokens.find(
      refreshToken => refreshToken.userId === userId
    );

    return refreshToken;
  }

  async deleteById(id: string): Promise<void> {
    const refreshTokenIndex = this.refreshTokens.findIndex(
      refreshToken => refreshToken.id === id
    );

    this.refreshTokens.splice(refreshTokenIndex, 1);
  }
}
