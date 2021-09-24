export interface IVerificationUser {
  id: string;

  userRequestId: string;

  token: string;

  expiresIn: Date;

  createdAt: Date;
}
