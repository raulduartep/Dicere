import { ICreateRoomDTO } from '@modules/chat/dtos/ICreateRoomDTO';
import { InMemoryRoom } from '@modules/chat/entities/implementations/inMemory/InMemoryRoom';
import { IRoom } from '@modules/chat/entities/IRoom';

import { IRoomsRepository } from '../../IRoomsRepository';

export class InMemoryRoomsRepository implements IRoomsRepository {
  private rooms: InMemoryRoom[] = [];

  async create(data: ICreateRoomDTO): Promise<InMemoryRoom> {
    const room = new InMemoryRoom(data);

    this.rooms.push(room);

    return room;
  }

  async findById(id: string): Promise<IRoom> {
    const room = this.rooms.find(room => room.id === id);

    return room;
  }
}
