import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm"

export class CreateInvoicesTable1689805979783 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({name: 'invoices', columns: [
            {
                name: 'id',
                type: 'varchar',
                isPrimary: true
            },
            {
                name: 'value',
                type: 'float',
            },
            {
                name: 'period',
                type: 'varchar',
            },
            {
                name: 'id_card',
                type: 'varchar',
            },
        ]}))

        const userFK = new TableForeignKey({referencedColumnNames: ['id'], referencedTableName: 'cards', columnNames: ['id_card'], onDelete: 'CASCADE'})

        await queryRunner.createForeignKey('invoices', userFK)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('invoices')
    }

}
