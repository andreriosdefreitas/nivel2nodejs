import {
    MigrationInterface,
    QueryRunner,
    TableColumn,
    TableForeignKey,
} from 'typeorm';

export default class AddUserIdToAppointments1601411255967
    implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn(
            'appointments',
            new TableColumn({
                name: 'user_id',
                type: 'uuid',
                isNullable: true,
            }),
        );
        await queryRunner.createForeignKey(
            'appointments',
            new TableForeignKey({
                columnNames: ['user_id'],
                referencedColumnNames: ['id'],
                referencedTableName: 'users',
                onDelete: 'SET NULL',
                onUpdate: 'CASCADE',
                name: 'AppointmentUserFK',
            }),
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey('appointments', 'AppointmentUserFK');

        await queryRunner.dropColumn('appointments', 'user_id');
    }
}
