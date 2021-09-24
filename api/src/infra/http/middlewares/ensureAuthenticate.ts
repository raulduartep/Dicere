import { NextFunction, Response, Request } from 'express';
import { container } from 'tsyringe';

import { JWTError } from '@shared/errors/JWTError';
import { ITokenManagerProvider } from '@shared/providers/TokenManagerProvider/ITokenManagerProvider';

import { authConfig } from '@config/auth';

export async function ensureAuthenticate(
  request: Request,
  _response: Response,
  next: NextFunction
): Promise<void> {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw new JWTError.JWTTokenMissing();
  }

  const [, token] = authHeader.split(' ');

  const tokenManagerProvider = container.resolve<ITokenManagerProvider>(
    'TokenManagerProvider'
  );

  const { accessTokenSecret } = authConfig;

  const { userId } = await tokenManagerProvider.verify<{ userId: string }>({
    secret: accessTokenSecret,
    token,
  });

  if (!userId) {
    throw new JWTError.JWTTokenInvalid();
  }

  request.user = {
    id: userId,
  };

  return next();
}
