import { container } from 'tsyringe';

import { ICallbackWS, IRequestWS } from '@infra/websocket/app';

import { ChangeMessageUserStatusUseCase } from './ChangeMessageUserStatusUseCase';

export class ChangeMessageUserStatusControllerWs {
  async handle(request: IRequestWS, callback: ICallbackWS): Promise<void> {
    const { socket } = request;
    const { id: userId } = socket.user;
    const { messageId, status } = request.body;

    const changeMessageUserStatusUseCase = container.resolve(
      ChangeMessageUserStatusUseCase
    );

    try {
      const message = await changeMessageUserStatusUseCase.execute({
        userId,
        status,
        messageId,
      });

      socket.broadcast
        .to(message.roomMessage.roomId)
        .emit('server:changeMessageStatus', { ...message, status });

      callback(null);
    } catch (error) {
      console.log(error);
      callback(error);
    }
  }
}
