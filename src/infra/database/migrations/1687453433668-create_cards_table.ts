import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm"

export class CreateCardsTable1687453433668 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({name: 'cards', columns: [
            {
                name: 'id',
                type: 'varchar',
                isPrimary: true
            },
            {
                name: 'number',
                type: 'int',
            },
            {
                name: 'flag',
                type: 'varchar',
            },
            {
                name: 'limit',
                type: 'float',
            },
            {
                name: 'current_value',
                type: 'float',
            },
            {
                name: 'id_type',
                type: 'varchar',
            },
            {
                name: 'id_user',
                type: 'varchar',
            },
            {
                name: 'close',
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

        const userFK = new TableForeignKey({referencedColumnNames: ['id'], referencedTableName: 'users', columnNames: ['id_user']})

        const typeFK = new TableForeignKey({referencedColumnNames: ['id'], referencedTableName: 'cards_type', columnNames: ['id_type']})

        await queryRunner.createForeignKeys('cards', [userFK, typeFK])
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('cards')
    }

}
