import { v4 as uuid } from 'uuid';

import { IUser } from '../../IUser';

export class InMemoryUser implements IUser {
  readonly id: string;

  name: string;

  email: string;

  password: string;

  deleted: boolean;

  picture: string;

  createdAt: Date;

  updatedAt: Date;

  constructor(
    props: Omit<
      InMemoryUser,
      'id' | 'updatedAt' | 'deleted' | 'password' | 'picture' | 'createdAt'
    > & { password?: string; picture?: string; createdAt?: Date }
  ) {
    Object.assign(this, {
      ...props,
      id: uuid(),
      createdAt: props.createdAt || new Date(),
      updatedAt: new Date(),
      deleted: false,
    });
  }
}
