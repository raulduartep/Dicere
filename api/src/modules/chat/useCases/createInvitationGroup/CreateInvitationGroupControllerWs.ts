import { container } from 'tsyringe';

import { ICallbackWS, IRequestWS } from '@infra/websocket/app';

import { CreateInvitationGroupUseCase } from './CreateInvitationGroupUseCase';

export class CreateInvitationGroupControllerWs {
  async handle(request: IRequestWS, callback: ICallbackWS): Promise<void> {
    const { socket } = request;
    const { friendId, roomId } = request.body;
    const { id: userId } = socket.user;

    try {
      const createInvitationGroupUseCase = container.resolve(
        CreateInvitationGroupUseCase
      );

      const {
        friendConnection,
        ...createInvitationGroup
      } = await createInvitationGroupUseCase.execute({
        friendId,
        userId,
        roomId,
      });

      if (friendConnection) {
        socket.to(friendConnection.socketId).emit('server:newInvitationGroup', {
          user: createInvitationGroup.user,
          invitationGroup: createInvitationGroup.invitationGroup,
          groupName: createInvitationGroup.groupName,
        });
      }

      callback(null);
    } catch (error) {
      callback(error);
    }
  }
}
