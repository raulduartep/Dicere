import { getRepository, Repository } from 'typeorm';

import { ICreateRefreshTokenDTO } from '@modules/users/dtos/ICreateRefreshTokenDTO';
import { TypeORMRefreshToken } from '@modules/users/entities/implementations/typeorm/TypeORMRefreshToken';
import { IRefreshToken } from '@modules/users/entities/IRefreshToken';

import { IRefreshTokensRepository } from '../../IRefreshTokensRepository';

export class TypeORMRefreshTokensRepository
  implements IRefreshTokensRepository {
  private readonly repository: Repository<TypeORMRefreshToken>;

  constructor() {
    this.repository = getRepository(TypeORMRefreshToken);
  }

  async findByRefreshTokenAndAccessToken({
    accessToken,
    refreshToken,
  }: {
    accessToken: string;
    refreshToken: string;
  }): Promise<IRefreshToken> {
    const refreshTokenData = await this.repository.findOne({
      where: {
        token: refreshToken,
        accessToken,
      },
    });

    return refreshTokenData;
  }

  async create(data: ICreateRefreshTokenDTO): Promise<TypeORMRefreshToken> {
    const refreshToken = this.repository.create(data);

    await this.repository.save(refreshToken);

    return refreshToken;
  }

  async findByUserId(userId: string): Promise<TypeORMRefreshToken> {
    const refreshToken = await this.repository.findOne({ userId });

    return refreshToken;
  }

  async deleteById(id: string): Promise<void> {
    await this.repository.delete(id);
  }
}
