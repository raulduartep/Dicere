import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { ResetPasswordUseCase } from './ResetPasswordUseCase';

export class ResetPasswordControllerHttp {
  async handle(request: Request, response: Response): Promise<Response> {
    const { token, access_token } = request.query;
    const { password } = request.body;

    const resetPasswordUseCase = container.resolve(ResetPasswordUseCase);

    await resetPasswordUseCase.execute({
      accessToken: String(access_token),
      password,
      token: String(token),
    });

    return response.status(200).send();
  }
}
