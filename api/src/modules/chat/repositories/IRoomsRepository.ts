import { ICreateRoomDTO } from '../dtos/ICreateRoomDTO';
import { IRoom } from '../entities/IRoom';

export interface IRoomsRepository {
  create(data: ICreateRoomDTO): Promise<IRoom>;
  findById(id: string): Promise<IRoom>;
}
