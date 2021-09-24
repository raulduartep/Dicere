import { IUser } from '../entities/IUser';

export type IUserMap = {
  id: string;
  email: string;
  name: string;
  updatedAt: Date;
  createdAt: Date;
  picture: string;
};

export type IUserMapForPublic = {
  id: string;
  name: string;
  picture: string;
};

export class UserMap {
  static map({
    updatedAt,
    createdAt,
    id,
    email,
    name,
    picture,
  }: IUser): IUserMap {
    return {
      id,
      email,
      name,
      createdAt,
      updatedAt,
      picture,
    };
  }

  static mapForPublic({ id, name, picture }: IUser): IUserMapForPublic {
    return {
      id,
      name,
      picture,
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
