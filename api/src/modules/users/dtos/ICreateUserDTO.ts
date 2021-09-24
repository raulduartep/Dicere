export type ICreateUserDTO = {
  name: string;
  email: string;
  password?: string;
  picture?: string;
  createdAt?: Date;
};
