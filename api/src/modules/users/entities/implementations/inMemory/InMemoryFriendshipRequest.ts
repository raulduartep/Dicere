import { v4 as uuid } from 'uuid';

import {
  IEnumDecisionFriendshipRequest,
  IFriendshipRequest,
} from '../../IFriendshipRequest';

export class InMemoryFriendshipRequest implements IFriendshipRequest {
  id: string;

  userId: string;

  friendId: string;

  decision: IEnumDecisionFriendshipRequest;

  createdAt: Date;

  constructor(
    props: Omit<InMemoryFriendshipRequest, 'id' | 'decision' | 'createdAt'>
  ) {
    Object.assign(this, {
      ...props,
      id: uuid(),
      decision: null,
      createdAt: new Date(),
    });
  }
}
