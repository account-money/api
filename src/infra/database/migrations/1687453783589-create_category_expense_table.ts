import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm"

export class CreateCategoryExpenseTable1687453783589 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({name: 'categories_expense', columns: [
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
                name: 'id_user',
                type: 'varchar',
            },
        ]}))

        const userFK = new TableForeignKey({referencedColumnNames: ['id'], referencedTableName: 'users', columnNames: ['id_user'], onDelete: 'CASCADE'})

        await queryRunner.createForeignKey('categories_expense', userFK)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('categories_expense')
    }

}
