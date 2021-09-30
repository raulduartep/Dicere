import { IUser } from '@modules/users/entities/IUser';

import { IGroup } from '../entities/IGroup';
import { IRoom, IRoomTypeEnum } from '../entities/IRoom';

export type IRoomMap = {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  type: IRoomTypeEnum;
  name: string;
  picture: string;
};

export class RoomMap {
  static mapPrivate(
    { id, typeConversation, createdAt, updatedAt }: IRoom,
    { picture, name }: IUser
  ): IRoomMap {
    return {
      id,
      createdAt,
      updatedAt,
      type: typeConversation,
      picture,
      name,
    };
  }

  static mapGroup(
    { id, typeConversation, createdAt, updatedAt }: IRoom,
    { name }: IGroup
  ): IRoomMap {
    return {
      id,
      createdAt,
      updatedAt,
      type: typeConversation,
      name,
      picture: '',
    };
  }
}
