import { inject, injectable } from 'tsyringe';

import { IUsersRepository } from '@modules/users/repositories/IUsersRepository';

const generateUsername = (name: string) => {
  const username =
    name.trim().replace(' ', '') + Math.floor(Math.random() * 100 + 1);

  return username;
};

@injectable()
export class GenerateUsername {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository
  ) {}

  async execute(name: string) {
    let usernameAlreadyExist = true;
    let username: string;

    while (usernameAlreadyExist) {
      username = generateUsername(name);

      // eslint-disable-next-line no-await-in-loop
      usernameAlreadyExist = !!(await this.usersRepository.findByUsername(
        username
      ));
    }

    return username;
  }
}
