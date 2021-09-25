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

  deleted: boolean;

  createdAt: Date;

  constructor(
    props: Omit<
      InMemoryFriendshipRequest,
      'id' | 'decision' | 'deleted' | 'createdAt'
    >
  ) {
    Object.assign(this, {
      ...props,
      id: uuid(),
      decision: null,
      deleted: false,
      createdAt: new Date(),
    });
  }
}
