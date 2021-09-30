import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { GetUsersByUsernameUseCase } from './GetUsersByUsernameUseCase';

export class GetUsersByUsernameControllerHttp {
  async handle(request: Request, response: Response): Promise<Response> {
    const { username } = request.params;

    const getUsersByUsernameUseCase = container.resolve(
      GetUsersByUsernameUseCase
    );

    const users = await getUsersByUsernameUseCase.execute({ username });

    return response.status(201).json(users);
  }
}
