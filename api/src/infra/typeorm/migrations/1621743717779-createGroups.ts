import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class createGroups1621743717779 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'groups',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
          },
          {
            name: 'name',
            type: 'varchar',
          },
          {
            name: 'room_id',
            type: 'uuid',
          },
          {
            name: 'admin_id',
            type: 'uuid',
          },
          {
            name: 'deleted',
            type: 'boolean',
            default: 'false',
          },
        ],
        foreignKeys: [
          {
            name: 'FKGroupRoom',
            columnNames: ['room_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'rooms',
            onDelete: 'NO ACTION',
            onUpdate: 'CASCADE',
          },
          {
            name: 'FKGroupAdmin',
            columnNames: ['admin_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'users',
            onDelete: 'NO ACTION',
            onUpdate: 'CASCADE',
          },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('groups');
  }
}
