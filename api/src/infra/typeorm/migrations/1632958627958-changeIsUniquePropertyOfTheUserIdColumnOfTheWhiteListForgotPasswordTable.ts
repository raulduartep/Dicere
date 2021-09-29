import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class changeIsUniquePropertyOfTheUserIdColumnOfTheWhiteListForgotPasswordTable1632958627958
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.changeColumn(
      'white_list_forgot_password',
      'user_id',
      new TableColumn({
        name: 'user_id',
        type: 'uuid',
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.changeColumn(
      'white_list_forgot_password',
      'user_id',
      new TableColumn({
        name: 'user_id',
        type: 'uuid',
        isUnique: true,
      })
    );
  }
}
