import { container } from 'tsyringe';

import { ICallbackWS, IRequestWS } from '@infra/websocket/app';

import { DecideFriendRequestUseCase } from './DecideFriendRequestUseCase';

export class DecidedFriendRequestControllerWs {
  async handle(request: IRequestWS, callback: ICallbackWS): Promise<void> {
    const { socket } = request;
    const { requestId, decision } = request.body;
    const { id: userId } = socket.user;
    try {
      const decideFriendRequestUseCase = container.resolve(
        DecideFriendRequestUseCase
      );

      const {
        friendConnection,
        ...decideFriendRequest
      } = await decideFriendRequestUseCase.execute({
        decision,
        requestId,
        userId,
      });

      if (friendConnection) {
        socket
          .to(friendConnection.socketId)
          .emit('server:friendRequestDecision', {
            decision,
            requestId,
            user: decideFriendRequest.user,
            room: decideFriendRequest.room,
          });
      }

      callback(null, {
        decision,
        requestId,
        friend: decideFriendRequest.friend,
        room: decideFriendRequest.room,
      });
    } catch (error) {
      callback(error);
    }
  }
}
