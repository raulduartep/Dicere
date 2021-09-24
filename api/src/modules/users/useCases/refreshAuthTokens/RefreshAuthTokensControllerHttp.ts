import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { RefreshAuthTokensUseCase } from './RefreshAuthTokensUseCase';

export class RefreshAuthTokensControllerHttp {
  async handle(request: Request, response: Response): Promise<Response> {
    const { refreshToken, accessToken } = request.body;

    const refreshTokenUseCase = container.resolve(RefreshAuthTokensUseCase);

    const authentication = await refreshTokenUseCase.execute({
      accessToken,
      refreshToken,
    });

    return response.status(200).json(authentication);
  }
}
