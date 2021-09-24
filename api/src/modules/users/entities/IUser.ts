export interface IUser {
  id: string;

  name: string;

  email: string;

  password: string;

  deleted: boolean;

  picture: string;

  createdAt: Date;

  updatedAt: Date;
}
