export type ICreateUserDTO = {
  name: string;
  email: string;
  username: string;
  password?: string;
  picture?: string;
  createdAt?: Date;
};
