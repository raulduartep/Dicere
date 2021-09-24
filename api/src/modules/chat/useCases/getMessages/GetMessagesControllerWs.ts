import { container } from 'tsyringe';

import { ICallbackWS, IRequestWS } from '@infra/websocket/app';

import { GetMessagesUseCase } from './GetMessagesUseCase';

export class GetMessagesControllerWs {
  async handle(request: IRequestWS, callback: ICallbackWS): Promise<void> {
    const { id: userId } = request.socket.user;
    const { roomId, page } = request.body;

    const getMessageUseCase = container.resolve(GetMessagesUseCase);

    const messages = await getMessageUseCase.execute({
      page: Number(page),
      roomId: String(roomId),
      userId,
    });

    callback(null, messages);
  }
}
