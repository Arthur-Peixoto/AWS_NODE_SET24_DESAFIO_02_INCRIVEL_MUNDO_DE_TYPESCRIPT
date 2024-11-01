import { timeStamp } from "console";
import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateCustomers1730485886879 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
              name: 'customers',
              columns: [
                {
                  name: 'id',
                  type: 'uuid',
                  isPrimary: true,
                  default: 'gen_random_uuid()',
                },
                {
                  name: 'full_name',
                  type: 'varchar',
                  isNullable: false,
                },
                {
                  name: 'date_birth',
                  type: 'timestamp',
                  isNullable: false, 
                  default: 'timeStamp', 
                },
                {
                  name: 'email',
                  type: 'varchar',
                  isNullable: false,
                  isUnique: true,
                },
                {
                  name: 'cpf',
                  type: 'varchar',
                  isNullable: false,
                },
                {
                  name: 'phone',
                  type: 'varchar',
                  isNullable: true,
                },
                {
                  name: 'initial_date',
                  type: 'timestamp',
                  default: null,
                  isNullable: true,
                },
                {
                  name: 'deleted_at',
                  type: 'timestamp',
                  isNullable: true,
                },
              ],
            }),
          );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('customers')
    }

}
