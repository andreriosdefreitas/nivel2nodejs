import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export default class CreateUsers1598558366884 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'users',
                columns: [
                    {
                        name: 'id',
                        type: 'varchar',
                        isPrimary: true,
                        generationStrategy: 'uuid',
                        default: 'uuid_generate_v4()',
                    },
                    {
                        name: 'name',
                        type: 'varchar',
                    },
                    {
                        name: 'email',
                        type: 'varchar', // only postgres
                        isUnique: true,
                    },
                    {
                        name: 'password',
                        type: 'varchar', // only postgres
                    },
                    {
                        name: 'created_at',
                        type: 'timestamp', // only postgres
                        default: 'now()',
                    },
                    {
                        name: 'updated_at',
                        type: 'timestamp', // only postgres
                        default: 'now()',
                    },
                ],
            }),
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('users');
    }
}
