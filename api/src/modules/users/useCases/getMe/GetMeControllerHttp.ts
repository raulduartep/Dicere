import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { GetMeUseCase } from './GetMeUseCase';

export class GetMeControllerHttp {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id: userId } = request.user;

    const getMeUseCase = container.resolve(GetMeUseCase);

    const userInfos = await getMeUseCase.execute({ userId });

    return response.status(201).json(userInfos);
  }
}
