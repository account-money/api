import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm"

export class CreateRevenuesTable1687451538749 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({name: 'revenues', columns: [
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
                name: 'value',
                type: 'float',
            },
            {
                name: 'id_user',
                type: 'varchar',
            },
            {
                name: 'received_at',
                type: 'timestamp'
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

        const userFK = new TableForeignKey({referencedColumnNames: ['id'], referencedTableName: 'users', columnNames: ['id_user'], onDelete: 'CASCADE'})

        await queryRunner.createForeignKey('revenues', userFK)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('revenues')
    }

}
