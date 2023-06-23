import { MigrationInterface, QueryRunner, Table } from "typeorm"

export class CreatePaymentTypesTable1687453760215 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({name: 'payments_type', columns: [
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

        await queryRunner.query("INSERT INTO payments_type (id, name) VALUES (1, 'Cartão de Crédito'), (2, 'Cartão de Débito'), (3, 'Dinheiro');")
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('payments_type')
    }

}
