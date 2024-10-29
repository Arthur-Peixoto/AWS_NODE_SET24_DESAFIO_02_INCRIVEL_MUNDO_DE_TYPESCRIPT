import { MigrationInterface, QueryRunner, Table } from 'typeorm'

export class CreateCars1730228276828 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"')

    await queryRunner.query(
      "CREATE TYPE status_enum AS ENUM ('ativo', 'inativo', 'pendente')",
    )

    await queryRunner.createTable(
      new Table({
        name: 'cars',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'licensePlate',
            type: 'VARCHAR',
            isNullable: false,
          },
          {
            name: 'brand',
            type: 'VARCHAR',
            isNullable: false,
          },
          {
            name: 'model',
            type: 'VARCHAR',
            isNullable: false,
          },
          {
            name: 'mileage',
            type: 'INTEGER',
            isNullable: true,
          },
          {
            name: 'year',
            type: 'INTEGER',
            isNullable: false,
          },
          {
            name: 'price',
            type: 'DECIMAL',
            precision: 10,
            scale: 2,
            isNullable: false,
          },
          {
            name: 'registrationDate',
            type: 'TIMESTAMP',
            default: 'now()',
          },
          {
            name: 'status',
            type: 'status_enum',
            isNullable: false,
          },
        ],
      }),
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('DROP EXTENSION IF EXISTS "uuid-ossp"')
    await queryRunner.dropTable('cars')
    await queryRunner.query(`DROP TYPE "status_enum"`)
  }
}
