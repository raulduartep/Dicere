import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class addUsernameColumnToUsersRequestTable1632976379335
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'user_requests',
      new TableColumn({
        name: 'username',
        type: 'varchar',
        isUnique: true,
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('user_requests', 'username');
  }
}
