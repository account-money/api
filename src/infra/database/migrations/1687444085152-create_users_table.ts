import { MigrationInterface, QueryRunner, Table } from "typeorm"

export class CreateUsersTable1687444085152 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({name: 'users', columns: [
            {
                name: 'id',
                type: 'varchar',
                isPrimary: true
            },
            {
                name: 'name',
                type: 'varchar',
            },
            {
                name: 'email',
                type: 'varchar',
            },
            {
                name: 'password',
                type: 'varchar',
            },
            {
                name: 'token',
                type: 'varchar',
                isNullable: true
            },
            {
                name: 'is_verified',
                type: 'boolean',
                default: false
            },
            {
                name: 'is_admin',
                type: 'boolean',
                default: false
            },
            {
                name: 'created_at',
                type: 'timestamp',
                default: 'now()'
            },
            {
                name: 'updated_at',
                type: 'timestamp',
                default: 'now()'
            }
        ]}))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('users')
    }

}
