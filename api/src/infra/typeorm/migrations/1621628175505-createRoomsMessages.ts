import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class createRoomsMessages1621628175505 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'rooms_messages',
        columns: [
          {
            name: 'message_id',
            type: 'uuid',
            isPrimary: true,
          },
          {
            name: 'room_id',
            type: 'uuid',
            isPrimary: true,
          },
        ],
        foreignKeys: [
          {
            name: 'FKRoomsMessagesMessage',
            columnNames: ['message_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'messages',
            onUpdate: 'NO ACTION',
            onDelete: 'NO ACTION',
          },
          {
            name: 'FKRoomsMessagesRooms',
            columnNames: ['room_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'rooms',
            onUpdate: 'NO ACTION',
            onDelete: 'NO ACTION',
          },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('rooms_messages');
  }
}
