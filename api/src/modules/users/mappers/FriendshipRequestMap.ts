import { IFriendshipRequest } from '../entities/IFriendshipRequest';

export type IFriendshipRequestMap = {
  createdAt: Date;
  id: string;
};

export class FriendshipRequestMap {
  static map({ createdAt, id }: IFriendshipRequest): IFriendshipRequestMap {
    return {
      createdAt,
      id,
    };
  }

  static mapMany(friensdhips: IFriendshipRequest[]): IFriendshipRequestMap[] {
    const friendshipsMap = friensdhips.map(friendship =>
      FriendshipRequestMap.map(friendship)
    );

    return friendshipsMap;
  }
}
