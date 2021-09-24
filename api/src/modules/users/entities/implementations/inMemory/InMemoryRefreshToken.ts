import { v4 as uuid } from 'uuid';

import { IRefreshToken } from '../../IRefreshToken';

export class InMemoryRefreshToken implements IRefreshToken {
  readonly id: string;

  userId: string;

  accessToken: string;

  token: string;

  expiresIn: Date;

  readonly createdAt: Date;

  constructor(props: Omit<InMemoryRefreshToken, 'id' | 'createdAt'>) {
    Object.assign(this, {
      ...props,
      id: uuid(),
      createdAt: new Date(),
    });
  }
}
