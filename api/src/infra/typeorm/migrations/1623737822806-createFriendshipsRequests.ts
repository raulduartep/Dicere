import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class createFriendshipsRequests1623737822806
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'friendships_requests',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
          },
          {
            name: 'user_id',
            type: 'uuid',
          },
          {
            name: 'friend_id',
            type: 'uuid',
          },
          {
            name: 'decision',
            type: 'enum',
            enum: ['accepted', 'reject'],
            isNullable: true,
            default: null,
          },
          {
            name: 'deleted',
            type: 'boolean',
            default: 'false',
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()',
          },
        ],
        foreignKeys: [
          {
            name: 'FKFriendshipRequestUser',
            columnNames: ['user_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'users',
            onDelete: 'NO ACTION',
            onUpdate: 'CASCADE',
          },
          {
            name: 'FKFriendshipRequestFriend',
            columnNames: ['friend_id'],
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
    await queryRunner.dropTable('friendships_requests');
  }
}
