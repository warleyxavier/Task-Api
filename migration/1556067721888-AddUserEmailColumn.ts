import {MigrationInterface, QueryRunner, TableColumn} from "typeorm";

export class AddUserEmailColumn1556067721888 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {

        await queryRunner.addColumn('users', new TableColumn({
            name: "email",
            type: "varchar",
            length: "150",
            isNullable: false,           
        }));

    }

    public async down(queryRunner: QueryRunner): Promise<any> {

        await queryRunner.dropColumn('users', 'email');

    }

}
