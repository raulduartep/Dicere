import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class createMessagesUsersStatus1622168115727
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'messages_users_status',
        columns: [
          {
            name: 'message_id',
            type: 'uuid',
            isPrimary: true,
          },
          {
            name: 'user_id',
            type: 'uuid',
            isPrimary: true,
          },
          {
            name: 'status',
            type: 'enum',
            enum: ['not_received', 'received', 'viewed'],
          },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('messages_users_status');
  }
}
