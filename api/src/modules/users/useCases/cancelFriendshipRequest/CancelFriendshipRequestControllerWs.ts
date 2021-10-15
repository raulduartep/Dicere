import { container } from 'tsyringe';

import { ICallbackWS, IRequestWS } from '@infra/websocket/app';

import { CancelFriendshipRequestUseCase } from './CancelFriendshipRequestUseCase';

export class CancelFriendshipRequestControllerWs {
  async handle(request: IRequestWS, callback: ICallbackWS): Promise<void> {
    const { socket } = request;
    const { friendshipRequestId } = request.body as {
      friendshipRequestId: string;
    };
    const { id: userId } = socket.user;

    try {
      const cancelFriendshipRequestUseCase = container.resolve(
        CancelFriendshipRequestUseCase
      );

      const {
        friendIoConnection,
      } = await cancelFriendshipRequestUseCase.execute({
        friendshipRequestId,
        userId,
      });

      if (friendIoConnection) {
        socket
          .to(friendIoConnection.socketId)
          .emit('server:friendshipRequestCancel', {
            friendshipRequestId,
          });
      }

      callback(null);
    } catch (error) {
      callback(error);
    }
  }
}
