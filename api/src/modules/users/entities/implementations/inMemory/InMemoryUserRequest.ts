import { v4 as uuid } from 'uuid';

import { IUserRequest } from '../../IUserRequest';

export class InMemoryUserRequest implements IUserRequest {
  id: string;
  name: string;
  email: string;
  password: string;
  createdAt: Date;

  constructor(
    props: Omit<InMemoryUserRequest, 'id' | 'createdAt' | 'password'>
  ) {
    Object.assign(this, {
      ...props,
      id: uuid(),
      createdAt: new Date(),
    });
  }
}
