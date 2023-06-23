import { MigrationInterface, QueryRunner, Table } from "typeorm"

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
        ]}))

        await queryRunner.query("INSERT INTO categories_expense (id, name) VALUES (1, 'Casa'), (2, 'Carro'), (3, 'Alimentação'), (4, 'PET'), (5, 'Viagem');")
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('categories_expense')
    }

}
