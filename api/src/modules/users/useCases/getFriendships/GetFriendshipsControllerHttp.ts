import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { GetFriendshipsUseCase } from './GetFrienshipsUseCase';

export class GetFriendshipsControllerHttp {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id: userId } = request.user;

    const getFriendshipsUseCase = container.resolve(GetFriendshipsUseCase);

    const friends = await getFriendshipsUseCase.execute({ userId });

    return response.status(201).json(friends);
  }
}
