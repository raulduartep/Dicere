import { v4 as uuid } from 'uuid';

import {
  IEnumDecisionInvitationGroup,
  IInvitationGroup,
} from '../../IInvitationGroup';

export class InMemoryInvitationGroup implements IInvitationGroup {
  id: string;

  userId: string;

  friendId: string;

  groupId: string;

  decision: IEnumDecisionInvitationGroup;

  createdAt: Date;

  constructor(
    props: Omit<InMemoryInvitationGroup, 'id' | 'decision' | 'createdAt'>
  ) {
    Object.assign(this, {
      ...props,
      id: uuid(),
      decision: null,
      createdAt: new Date(),
    });
  }
}
