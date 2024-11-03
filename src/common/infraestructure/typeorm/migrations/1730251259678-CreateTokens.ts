import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTokens1730228906207 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // Remove a tabela 'tokens' caso ainda exista
        await queryRunner.dropTable('tokens', true);
    }
}
