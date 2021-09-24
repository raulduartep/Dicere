import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { CreateRoomUserUseCase } from './CreateRoomUserUseCase';

export class CreateRoomUserControllerHttp {
  async handle(request: Request, response: Response): Promise<Response> {
    const { roomId } = request.params;
    const { id: userId } = request.user;

    const createRoomUserUseCase = container.resolve(CreateRoomUserUseCase);

    await createRoomUserUseCase.execute({
      roomId,
      userId,
    });

    return response.status(201).send();
  }
}
