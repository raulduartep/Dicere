import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class createMessagesMedia1621628034037 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'messages_media',
        columns: [
          {
            name: 'message_id',
            type: 'uuid',
            isPrimary: true,
          },
          {
            name: 'media_path',
            type: 'varchar',
          },
          {
            name: 'type',
            type: 'enum',
            enum: ['image', 'video', 'audio'],
          },
        ],
        foreignKeys: [
          {
            name: 'FKMessageMediaMessage',
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
    await queryRunner.dropTable('messages_media');
  }
}
