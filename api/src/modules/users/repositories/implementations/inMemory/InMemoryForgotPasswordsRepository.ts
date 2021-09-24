import { ICreateForgotPassword } from '@modules/users/dtos/ICreateForgotPassword';
import { InMemoryForgotPassword } from '@modules/users/entities/implementations/inMemory/InMemoryForgotPassword';

import { IForgotPasswordsRepository } from '../../IForgotPasswordsRepository';

export class InMemoryForgotPasswordsRepository
  implements IForgotPasswordsRepository {
  private forgotPasswords: InMemoryForgotPassword[] = [];

  async create(data: ICreateForgotPassword): Promise<InMemoryForgotPassword> {
    const forgotPassword = new InMemoryForgotPassword(data);

    this.forgotPasswords.push(forgotPassword);

    return forgotPassword;
  }

  async findById(id: string): Promise<InMemoryForgotPassword> {
    const forgotPassword = this.forgotPasswords.find(
      forgotPassword => forgotPassword.id === id
    );

    return forgotPassword;
  }

  async findValidByUserId(userId: string): Promise<InMemoryForgotPassword> {
    const forgotPassword = this.forgotPasswords.find(
      forgotPassword =>
        forgotPassword.userId === userId && forgotPassword.isValid === true
    );

    return forgotPassword;
  }

  async invalidate(id: string): Promise<void> {
    const forgotPassword = this.forgotPasswords.find(
      forgotPassword => forgotPassword.id === id
    );

    forgotPassword.isValid = false;
  }
}
