import {
  MigrationInterface,
  QueryRunner,
  TableForeignKey,
  TableColumn,
} from 'typeorm';

export default class AlterOrderServiceToPersonID1599907280465
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey(
      'orderservice',
      'FK_25e621c603225e88d1246c20cf6',
    );

    await queryRunner.dropColumn('orderservice', 'costumer_id');

    await queryRunner.addColumn(
      'orderservice',
      new TableColumn({
        name: 'person_id',
        type: 'uuid',
      }),
    );

    await queryRunner.createForeignKey(
      'orderservice',
      new TableForeignKey({
        name: 'PersonOrderService',
        columnNames: ['person_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'persons',
        onUpdate: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('orderservice', 'PersonOrderService');

    await queryRunner.dropColumn('orderservice', 'person_id');

    await queryRunner.addColumn(
      'orderservice',
      new TableColumn({
        name: 'costumer_id',
        type: 'uuid',
      }),
    );
  }
}
