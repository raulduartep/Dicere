export interface IRefreshToken {
  id: string;

  userId: string;

  accessToken: string;

  token: string;

  expiresIn: Date;

  createdAt: Date;
}
