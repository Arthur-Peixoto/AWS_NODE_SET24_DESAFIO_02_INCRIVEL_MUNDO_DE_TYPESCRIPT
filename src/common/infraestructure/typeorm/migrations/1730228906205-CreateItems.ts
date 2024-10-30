import { query } from 'express'
import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm'

export class CreateItems1730228906205 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'items',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'name',
            type: 'VARCHAR',
            isNullable: false,
          },
          {
            name: 'carId',
            type: 'uuid',
            isNullable: false,
          },
        ],
      }),
    )
    await queryRunner.createForeignKey(
      'items',
      new TableForeignKey({
        name: 'itemsCar',
        columnNames: ['carId'],
        referencedTableName: 'cars',
        referencedColumnNames: ['id'],
        onDelete: 'CASCADE',
      }),
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('items')
  }
}
