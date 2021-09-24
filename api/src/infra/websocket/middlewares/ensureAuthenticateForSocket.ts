import { container } from 'tsyringe';

import { AppError } from '@shared/errors/AppError';
import { JWTError } from '@shared/errors/JWTError';
import { ITokenManagerProvider } from '@shared/providers/TokenManagerProvider/ITokenManagerProvider';

import { authConfig } from '@config/auth';

import { IExtendedSocket } from '../app';

export async function ensureAuthenticateForSocket(socket: IExtendedSocket) {
  const handle = async (
    packet: any[],
    next: (err?: AppError) => void
  ): Promise<void> => {
    const authHeader = socket.handshake.auth.token as string;

    if (!authHeader) {
      return next(new JWTError.JWTTokenMissing());
    }

    const [, token] = authHeader.split(' ');

    if (!token) {
      return next(new JWTError.JWTTokenMissing());
    }

    const tokenManagerProvider = container.resolve<ITokenManagerProvider>(
      'TokenManagerProvider'
    );

    const { accessTokenSecret } = authConfig;

    try {
      const { userId } = await tokenManagerProvider.verify<{ userId: string }>({
        secret: accessTokenSecret,
        token,
      });

      if (!userId) {
        return next(new JWTError.JWTTokenInvalid());
      }

      socket.user = {
        id: userId,
      };

      return next();
    } catch (error) {
      return next(new JWTError.JWTTokenInvalid());
    }
  };

  return handle;
}
