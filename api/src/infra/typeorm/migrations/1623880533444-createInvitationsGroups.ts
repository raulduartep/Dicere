import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class createInvitationsGroups1623880533444
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'invitations_groups',
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
            name: 'group_id',
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
            name: 'created_at',
            type: 'timestamp',
            default: 'now()',
          },
        ],
        foreignKeys: [
          {
            name: 'FKInvitationGroupUser',
            columnNames: ['user_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'users',
            onDelete: 'NO ACTION',
            onUpdate: 'CASCADE',
          },
          {
            name: 'FKInvitationGroupFriend',
            columnNames: ['friend_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'users',
            onDelete: 'NO ACTION',
            onUpdate: 'CASCADE',
          },
          {
            name: 'FKInvitationGroupGroup',
            columnNames: ['group_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'groups',
            onDelete: 'NO ACTION',
            onUpdate: 'CASCADE',
          },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('invitations_groups');
  }
}
