export interface IForgotPassword {
  id: string;

  userId: string;

  token: string;

  expiresIn: Date;

  isValid: boolean;

  createdAt: Date;
}
