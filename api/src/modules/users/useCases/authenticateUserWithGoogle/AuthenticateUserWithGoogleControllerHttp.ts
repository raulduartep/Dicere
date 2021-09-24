import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { AuthenticateUserWithGoogleUseCase } from './AuthenticateUserWithGoogleUseCase';

export class AuthenticateUserWithGoogleControllerHttp {
  async handle(request: Request, response: Response): Promise<Response> {
    const { code } = request.query;

    const authenticateUserWithGoogleUseCase = container.resolve(
      AuthenticateUserWithGoogleUseCase
    );

    const session = await authenticateUserWithGoogleUseCase.execute({
      code: String(code),
    });

    return response.status(200).json(session);
  }
}
