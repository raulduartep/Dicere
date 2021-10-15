import { IUser } from '../entities/IUser';

export type IUserMap = {
  id: string;
  email: string;
  name: string;
  username: string;
  updatedAt: Date;
  createdAt: Date;
  picture: string;
};

export type IUserMapForPublic = {
  id: string;
  name: string;
  picture: string;
  username: string;
};

export class UserMap {
  static map({
    updatedAt,
    createdAt,
    id,
    email,
    name,
    picture,
    username,
  }: IUser): IUserMap {
    return {
      id,
      email,
      name,
      createdAt,
      updatedAt,
      picture: `${process.env.SERVER_URL}/static/pictures/${
        picture || 'blank.png'
      }`,
      username,
    };
  }

  static mapForPublic({
    id,
    name,
    picture,
    username,
  }: IUser): IUserMapForPublic {
    return {
      id,
      name,
      picture,
      username,
    };
  }

  static mapMany(users: IUser[]): IUserMap[] {
    const usersMap = users.map(user => UserMap.map(user));

    return usersMap;
  }

  static mapManyForPublic(users: IUser[]): IUserMapForPublic[] {
    const usersMap = users.map(user => UserMap.mapForPublic(user));

    return usersMap;
  }
}
