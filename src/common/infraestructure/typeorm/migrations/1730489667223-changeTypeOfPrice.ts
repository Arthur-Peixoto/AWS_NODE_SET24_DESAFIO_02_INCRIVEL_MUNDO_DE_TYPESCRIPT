import { MigrationInterface, QueryRunner } from 'typeorm'

export class ChangeTypeOfPrice1730489667223 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE cars
            ALTER COLUMN price TYPE REAL
            USING price::REAL
          `)
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE cars
            ALTER COLUMN price TYPE DECIMAL(10, 2)
            USING price::DECIMAL(10, 2)
          `)
  }
}
