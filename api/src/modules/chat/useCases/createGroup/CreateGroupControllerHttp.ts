import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { CreateGroupUseCase } from './CreateGroupUseCase';

export class CreateGroupControllerHttp {
  async handle(request: Request, response: Response): Promise<Response> {
    const { name } = request.body;
    const { id: userId } = request.user;

    const createGroupUseCase = container.resolve(CreateGroupUseCase);

    const group = await createGroupUseCase.execute({
      name,
      userId,
    });

    return response.status(201).json(group);
  }
}
