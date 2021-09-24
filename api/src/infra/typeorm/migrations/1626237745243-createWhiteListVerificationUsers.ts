import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class createWhiteListVerificationUsers1626237745243
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'white_list_verification_users',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
          },
          {
            name: 'token',
            type: 'varchar',
            isUnique: true,
          },
          {
            name: 'user_request_id',
            type: 'uuid',
            isUnique: true,
          },
          {
            name: 'expires_in',
            type: 'timestamp',
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()',
          },
        ],
        foreignKeys: [
          {
            name: 'FKVerificationUserUserRequest',
            referencedTableName: 'user_requests',
            referencedColumnNames: ['id'],
            columnNames: ['user_request_id'],
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
          },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('white_list_verification_user');
  }
}
