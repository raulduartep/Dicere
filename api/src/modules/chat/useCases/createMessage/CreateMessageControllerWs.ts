import { container } from 'tsyringe';

import { ICallbackWS, IRequestWS } from '@infra/websocket/app';
import { IMessageTypeEnum } from '@modules/chat/entities/IMessage';
import { IMessageMediaTypeEnum } from '@modules/chat/entities/IMessageMedia';

import { CreateMessageUseCase } from './CreateMessageUseCase';

export class CreateMessageControllerWs {
  async handle(request: IRequestWS, callback: ICallbackWS): Promise<void> {
    const { body, filename, socket } = request;
    const { id: userId } = socket.user;
    const { typeMedia, roomId, content, typeMessage } = body as {
      typeMessage: IMessageTypeEnum;
      typeMedia?: IMessageMediaTypeEnum;
      roomId: string;
      content?: string;
    };

    try {
      const createMessageUseCase = container.resolve(CreateMessageUseCase);

      const message = await createMessageUseCase.execute({
        typeMessage,
        mediaPath: filename,
        typeMedia,
        content,
        roomId,
        creatorUserId: userId,
      });

      socket.broadcast.to(roomId).emit('server:newMessage', message);

      callback(null, message);
    } catch (error) {
      callback(error);
    }
  }
}
