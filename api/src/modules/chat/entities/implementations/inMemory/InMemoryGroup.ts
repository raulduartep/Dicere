import { v4 as uuid } from 'uuid';

import { IGroup } from '../../IGroup';

export class InMemoryGroup implements IGroup {
  readonly id: string;

  roomId: string;

  adminId: string;

  name: string;

  deleted: boolean;

  constructor(props: Omit<InMemoryGroup, 'id' | 'deleted'>) {
    Object.assign(this, {
      ...props,
      id: uuid(),
      deleted: false,
    });
  }
}
