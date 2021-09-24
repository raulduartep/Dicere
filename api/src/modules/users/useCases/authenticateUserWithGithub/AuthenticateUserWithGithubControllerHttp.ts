import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { AuthenticateUserWithGithubUseCase } from './AuthenticateUserWithGithubUseCase';

export class AuthenticateUserWithGithubControllerHttp {
  async handle(request: Request, response: Response): Promise<Response> {
    const { code } = request.query;

    const authenticateUserWithGithubUseCase = container.resolve(
      AuthenticateUserWithGithubUseCase
    );

    const session = await authenticateUserWithGithubUseCase.execute({
      code: String(code),
    });

    return response.status(200).json(session);
  }
}
