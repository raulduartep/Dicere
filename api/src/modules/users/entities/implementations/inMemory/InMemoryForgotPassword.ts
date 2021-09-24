import { v4 as uuid } from 'uuid';

import { IForgotPassword } from '../../IForgotPassword';

export class InMemoryForgotPassword implements IForgotPassword {
  readonly id: string;

  userId: string;

  token: string;

  expiresIn: Date;

  isValid: boolean;

  readonly createdAt: Date;

  constructor(
    props: Omit<InMemoryForgotPassword, 'id' | 'createdAt' | 'isValid'>
  ) {
    Object.assign(this, {
      ...props,
      id: uuid(),
      createdAt: new Date(),
      isValid: true,
    });
  }
}
