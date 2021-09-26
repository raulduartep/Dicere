import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { GetPendingsFriendshipsUseCase } from './GetPendingsFriendshipsUseCase';

export class GetPendingsFriendshipsControllerHttp {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id: userId } = request.user;

    const getPendingsFriendshipsUseCase = container.resolve(
      GetPendingsFriendshipsUseCase
    );

    const pendingsFriendships = await getPendingsFriendshipsUseCase.execute({
      userId,
    });

    return response.status(201).json(pendingsFriendships);
  }
}
