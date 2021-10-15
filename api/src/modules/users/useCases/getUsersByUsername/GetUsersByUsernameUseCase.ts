import { inject, injectable } from 'tsyringe';

import { GetUserRoomsError } from '@modules/chat/useCases/getUserRooms/GetUserRoomsError';
import { IUserMapForPublic, UserMap } from '@modules/users/mappers/UserMap';
import { IUsersRepository } from '@modules/users/repositories/IUsersRepository';

type IRequest = {
  username: string;
  userId: string;
};

type IResponse = IUserMapForPublic[];

@injectable()
export class GetUsersByUsernameUseCase {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository
  ) {}

  async execute({ username, userId }: IRequest): Promise<IResponse> {
    const user = await this.usersRepository.findById(userId);

    if (!user) {
      throw new GetUserRoomsError.UserDoesNotExist();
    }

    const users = await this.usersRepository.getAllByUsername(username, userId);

    return UserMap.mapManyForPublic(users);
  }
}
