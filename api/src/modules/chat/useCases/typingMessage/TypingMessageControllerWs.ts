import { container } from 'tsyringe';

import { ICallbackWS, IRequestWS } from '@infra/websocket/app';

import { TypingMessageUseCase } from './TypingMessageUseCase';

export class TypingMessageControllerWs {
  async handle(request: IRequestWS, callback: ICallbackWS): Promise<void> {
    const { socket } = request;
    const { roomId } = request.body;
    const { id: userId } = request.socket.user;

    try {
      const typingMessageUseCase = container.resolve(TypingMessageUseCase);

      const user = await typingMessageUseCase.execute({ roomId, userId });

      socket.broadcast.to(roomId).emit('server:typingMessage', { user });

      callback(null);
    } catch (error) {
      callback(error);
    }
  }
}
