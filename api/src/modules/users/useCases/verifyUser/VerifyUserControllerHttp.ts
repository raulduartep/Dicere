import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { VerifyUserUseCase } from './VerifyUserUseCase';

export class VerifyUserControllerHttp {
  async handle(request: Request, response: Response): Promise<Response> {
    const { access_token, token } = request.query;

    const verifyUserUseCase = container.resolve(VerifyUserUseCase);

    await verifyUserUseCase.execute({
      accessToken: String(access_token),
      token: String(token),
    });

    return response.status(201).send();
  }
}
