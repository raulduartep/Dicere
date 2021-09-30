import { IFriendshipRequest } from '../entities/IFriendshipRequest';

export type IFriendshipRequestMap = {
  createdAt: Date;
  id: string;
};

export class FrienshipRequestMap {
  static map({ createdAt, id }: IFriendshipRequest): IFriendshipRequestMap {
    return {
      createdAt,
      id,
    };
  }

  static mapMany(friensdhips: IFriendshipRequest[]): IFriendshipRequestMap[] {
    const friendshipsMap = friensdhips.map(friendship =>
      FrienshipRequestMap.map(friendship)
    );

    return friendshipsMap;
  }
}
