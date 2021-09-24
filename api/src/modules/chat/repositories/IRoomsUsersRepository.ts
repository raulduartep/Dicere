import { ICreateRoomUserDTO } from '../dtos/ICreateRoomUserDTO';
import { IRoomUser } from '../entities/IRoomUser';

export interface IRoomsUsersRepository {
  create(data: ICreateRoomUserDTO): Promise<IRoomUser>;
  findByRoomAndUser(data: {
    userId: string;
    roomId: string;
  }): Promise<IRoomUser>;
  getByUserId(userId: string): Promise<IRoomUser[]>;
  getByRoomId(roomId: string): Promise<IRoomUser[]>;
}
