import { container } from 'tsyringe';

import { ICallbackWS, IRequestWS } from '@infra/websocket/app';
import { IEnumDecisionFriendshipRequest } from '@modules/users/entities/IFriendshipRequest';

import { DecideFriendRequestUseCase } from './DecideFriendRequestUseCase';

export class DecidedFriendRequestControllerWs {
  async handle(request: IRequestWS, callback: ICallbackWS): Promise<void> {
    const { socket } = request;
    const { friendshipRequestId, decision } = request.body as {
      friendshipRequestId: string;
      decision: IEnumDecisionFriendshipRequest;
    };
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
        friendshipRequestId,
        userId,
      });

      if (friendConnection) {
        socket
          .to(friendConnection.socketId)
          .emit('server:friendRequestDecision', {
            decision,
            friendshipRequestId,
            user: decideFriendRequest.user,
            room: decideFriendRequest.room,
          });
      }

      callback(null, {
        friend: decideFriendRequest.friend,
        room: decideFriendRequest.room,
      });
    } catch (error) {
      callback(error);
    }
  }
}
