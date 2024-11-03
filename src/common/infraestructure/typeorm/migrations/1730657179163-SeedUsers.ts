import { MigrationInterface, QueryRunner } from "typeorm";
import bcrypt from 'bcrypt';

export class SeedUsers1730657179163 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        const passwordHash = await bcrypt.hash('password123', 10); 

        await queryRunner.query(
            `INSERT INTO users (id, full_name, email, password, created_at) 
             VALUES (gen_random_uuid(), 'Darwin Nunez', 'mudryk@email.com', vasco, CURRENT_TIMESTAMP)`,
            [passwordHash]
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `DELETE FROM users WHERE email = 'mudryk@email.com'`
        );
    }

}
