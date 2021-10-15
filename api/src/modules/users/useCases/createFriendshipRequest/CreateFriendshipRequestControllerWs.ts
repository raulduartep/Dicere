import { container } from 'tsyringe';

import { ICallbackWS, IRequestWS } from '@infra/websocket/app';

import { CreateFriendshipRequestUseCase } from './CreateFriendshipRequestUseCase';

export class CreateFriendshipRequestControllerWs {
  async handle(request: IRequestWS, callback: ICallbackWS): Promise<void> {
    const { socket } = request;
    const { friendId } = request.body;
    const { id: userId } = request.socket.user;

    try {
      const createFriendshipRequestUseCase = container.resolve(
        CreateFriendshipRequestUseCase
      );
      const {
        friendConnection,
        user,
        friendshipRequest,
      } = await createFriendshipRequestUseCase.execute({
        friendId: String(friendId),
        userId,
      });

      if (friendConnection) {
        socket.to(friendConnection.socketId).emit('server:newFriendRequest', {
          friend: user,
          friendshipRequest,
        });
      }

      callback(null, {
        friendshipRequest,
        user,
      });
    } catch (error) {
      callback(error);
    }
  }
}
