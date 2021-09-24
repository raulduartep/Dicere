export type ICreateRefreshTokenDTO = {
  userId: string;
  token: string;
  accessToken: string;
  expiresIn: Date;
};
