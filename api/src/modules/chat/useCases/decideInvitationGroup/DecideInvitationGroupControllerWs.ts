import { container } from 'tsyringe';

import { ICallbackWS, IRequestWS } from '@infra/websocket/app';
import { IEnumDecisionInvitationGroup } from '@modules/chat/entities/IInvitationGroup';

import { DecideInvitationGroupUseCase } from './DecideInvitationGroupUseCase';

export class DecideInvitationGroupControllerWs {
  async handle(request: IRequestWS, callback: ICallbackWS): Promise<void> {
    const { socket } = request;
    const { invitationId, decision } = request.body as {
      invitationId: string;
      decision: IEnumDecisionInvitationGroup;
    };
    const { id: userId } = socket.user;

    try {
      const decideInvitationGroupUseCase = container.resolve(
        DecideInvitationGroupUseCase
      );

      const {
        friendConnection,
        room,
      } = await decideInvitationGroupUseCase.execute({
        invitationId,
        userId,
        decision,
      });

      if (friendConnection) {
        socket
          .to(friendConnection.socketId)
          .emit('server:invitationGroupDecision', {
            invitationId,
            decision,
          });
      }

      callback(null, { decision, room });
    } catch (error) {
      callback(error);
    }
  }
}
