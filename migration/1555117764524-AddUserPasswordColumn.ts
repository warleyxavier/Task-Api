import {MigrationInterface, QueryRunner, TableColumn} from "typeorm";

export class AddUserPasswordColumn1555117764524 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {

        await queryRunner.addColumn("users", new TableColumn({
            name: "password",
            type: "varchar",
            length: "100",
        }));

    }

    public async down(queryRunner: QueryRunner): Promise<any> {

        await queryRunner.dropColumn("users", "password");

    }

}
