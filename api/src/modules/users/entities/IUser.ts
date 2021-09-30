export interface IUser {
  id: string;

  name: string;

  email: string;

  username: string;

  password: string;

  deleted: boolean;

  picture: string;

  createdAt: Date;

  updatedAt: Date;
}
