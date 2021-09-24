import { v4 as uuid } from 'uuid';

import { IVerificationUser } from '../../IVerificationUser';

export class InMemoryVerificationUser implements IVerificationUser {
  readonly id: string;
  userRequestId: string;
  token: string;
  expiresIn: Date;
  readonly createdAt: Date;

  constructor(props: Omit<InMemoryVerificationUser, 'id' | 'createdAt'>) {
    Object.assign(this, {
      ...props,
      id: uuid(),
      createdAt: new Date(),
    });
  }
}
