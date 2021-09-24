export type ICreateForgotPassword = {
  token: string;
  userId: string;
  expiresIn: Date;
};
