export type IPayload = Record<string, unknown>;

export type IOptions = {
  payload: IPayload;
  subject: string;
  expiresIn: string;
  secret: string;
};

export type IVerifyResponse<T extends IPayload> = {
  exp: string;
  sub: string;
  iat: string;
} & T;

export interface ITokenManagerProvider {
  sign(options: IOptions): Promise<string>;
  verify<T extends IPayload>({
    token,
    secret,
  }: {
    token: string;
    secret: string;
  }): Promise<IVerifyResponse<T>>;
}
