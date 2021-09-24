import { IUser } from '@modules/users/entities/IUser';

import { IGroup } from './IGroup';
import { IRoomMessage } from './IRoomMessage';
import { IRoomUser } from './IRoomUser';

export enum IRoomTypeEnum {
  GROUP = 'group',
  PRIVATE = 'private',
}

export interface IRoom {
  id: string;
  active: boolean;
  typeConversation: IRoomTypeEnum;
  usersInside?: IRoomUser[];
  messages?: IRoomMessage[];
  group?: IGroup;
  createdAt: Date;
  updatedAt: Date;
}
