import { ICreateRefreshTokenDTO } from '../dtos/ICreateRefreshTokenDTO';
import { IRefreshToken } from '../entities/IRefreshToken';

export interface IRefreshTokensRepository {
  create(data: ICreateRefreshTokenDTO): Promise<IRefreshToken>;
  findByRefreshTokenAndAccessToken(data: {
    accessToken: string;
    refreshToken: string;
  }): Promise<IRefreshToken>;
  findByUserId(userIid: string): Promise<IRefreshToken>;
  deleteById(id: string): Promise<void>;
}
