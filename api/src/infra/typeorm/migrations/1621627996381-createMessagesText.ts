import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class createMessagesText1621627996381 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'messages_text',
        columns: [
          {
            name: 'message_id',
            type: 'uuid',
            isPrimary: true,
          },
          {
            name: 'content',
            type: 'varchar',
          },
        ],
        foreignKeys: [
          {
            name: 'FKMessagesTextMessage',
            columnNames: ['message_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'messages',
            onDelete: 'NO ACTION',
            onUpdate: 'NO ACTION',
          },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('messages_text');
  }
}
