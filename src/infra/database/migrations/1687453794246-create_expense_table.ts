import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm"

export class CreateExpenseTable1687453794246 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({name: 'expenses', columns: [
            {
                name: 'id',
                type: 'varchar',
                isPrimary: true
            },
            {
                name: 'description',
                type: 'varchar',
            },
            {
                name: 'amount',
                type: 'float',
            },
            {
                name: 'parcels',
                type: 'int',
            },
            {
                name: 'parcel_value',
                type: 'float',
            },
            {
                name: 'id_user',
                type: 'varchar',
            },
            {
                name: 'id_payment',
                type: 'varchar',
            },
            {
                name: 'id_category',
                type: 'varchar',
            },
            {
                name: 'deadline',
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

        const categoryFK = new TableForeignKey({referencedColumnNames: ['id'], referencedTableName: 'categories_expense', columnNames: ['id_payment']})

        const paymentFK = new TableForeignKey({referencedColumnNames: ['id'], referencedTableName: 'payments_type', columnNames: ['id_category']})

        await queryRunner.createForeignKeys('expenses', [userFK, paymentFK, categoryFK])
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('expenses')
    }

}
