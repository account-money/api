import { MigrationInterface, QueryRunner, Table } from "typeorm"

export class CreateCardsTypeTable1687453278242 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({name: 'cards_type', columns: [
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

        await queryRunner.query("INSERT INTO cards_type (id, name) VALUES (1, 'Crédito'), (2, 'Débito');")
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('cards_type')
    }

}
