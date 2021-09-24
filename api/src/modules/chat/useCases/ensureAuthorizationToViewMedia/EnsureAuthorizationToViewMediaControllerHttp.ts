import { Request, Response } from 'express';
import path from 'path';
import { container } from 'tsyringe';

import { EnsureAuthorizationToViewMediaUseCase } from './EnsureAuthorizationToViewMediaUseCase';

export class EnsureAuthorizationToViewMediaControllerHttp {
  async handle(request: Request, response: Response): Promise<void> {
    const { id: userId } = request.user;
    const { mediaPath } = request.params;

    const ensureAuthorizationToViewMediaUseCase = container.resolve(
      EnsureAuthorizationToViewMediaUseCase
    );

    await ensureAuthorizationToViewMediaUseCase.execute({ mediaPath, userId });

    const dirname = path.join(process.cwd(), 'static', 'media');

    response.status(200).sendFile(mediaPath, {
      root: dirname,
    });
  }
}
