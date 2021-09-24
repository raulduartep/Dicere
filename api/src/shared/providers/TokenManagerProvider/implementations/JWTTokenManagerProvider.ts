import { sign as signJWT, verify as verifyJWT } from 'jsonwebtoken';

import {
  IOptions,
  IPayload,
  ITokenManagerProvider,
  IVerifyResponse,
} from '../ITokenManagerProvider';

export class JWTTokenManagerProvider implements ITokenManagerProvider {
  async sign({
    expiresIn,
    payload,
    secret,
    subject,
  }: IOptions): Promise<string> {
    const token = signJWT(payload, secret, {
      subject,
      expiresIn,
    });

    return token;
  }

  async verify<T extends IPayload>({
    token,
    secret,
  }: {
    token: string;
    secret: string;
  }): Promise<IVerifyResponse<T>> {
    const payload = verifyJWT(token, secret) as IVerifyResponse<T>;

    return payload;
  }
}
