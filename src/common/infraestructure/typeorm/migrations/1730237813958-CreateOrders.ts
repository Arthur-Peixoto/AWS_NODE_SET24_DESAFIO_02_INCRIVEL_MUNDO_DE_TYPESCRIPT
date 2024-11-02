import { MigrationInterface, QueryRunner, Table } from 'typeorm'

export class CreateOrders1730237813958 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"')

    await queryRunner.query(
      "CREATE TYPE uf_enum AS ENUM ('AC', 'AL', 'AM', 'AP', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA', 'MG', 'MS', 'MT', 'PA', 'PB', 'PE', 'PI', 'PR', 'RJ', 'RN', 'RO', 'RR', 'RS', 'SC', 'SE', 'SP', 'TO')",
    )

    await queryRunner.createTable(
      new Table({
        name: 'orders',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'initial_date',
            type: 'timestamp',
            default: null,
            isNullable: true,
          },
          {
            name: 'final_date',
            type: 'timestamp',
            default: null,
            isNullable: true,
          },
          {
            name: 'status',
            type: 'status_enum',
            default: null,
            isNullable: true,
          },
          {
            name: 'cep',
            type: 'varchar',
            default: null,
            isNullable: true,
          },
          {
            name: 'city',
            type: 'varchar',
            default: null,
            isNullable: true,
          },
          {
            name: 'uf',
            type: 'uf_enum',
            default: null,
            isNullable: true,
          },
          {
            name: 'total_value',
            type: 'decimal',
            precision: 10,
            scale: 2,
            default: 0,
            isNullable: true,
          },
          {
            name: 'cancel_date',
            type: 'timestamp',
            default: null,
            isNullable: true,
          },
        ],
      }),
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('DROP EXTENSION IF EXISTS "uuid-ossp"')
    await queryRunner.dropTable('orders')
    await queryRunner.query(`DROP TYPE "status_enum"`)
    await queryRunner.query(`DROP TYPE "uf_enum"`)
  }
}
