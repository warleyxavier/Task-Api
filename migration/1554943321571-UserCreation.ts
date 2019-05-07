import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class UserCreation1554943321571 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {

        await queryRunner.createTable( new Table({
            name: "users",
            columns: [
                {
                    name: "id",
                    type: "int",
                    isPrimary: true,
                    isGenerated: true,
                    isNullable: false,
                },
                {
                    name: "name",
                    type: "varchar",
                    length: "60",
                    isNullable: false,
                },
                {
                    name: "email",
                    type: "varchar",
                    length: "150",
                    isNullable: false,
                },
                {
                    name: "password",
                    type: "varchar",
                    length: "100",
                    isNullable: false,
                },                
            ],
        }), true);    

    };

    public async down(queryRunner: QueryRunner): Promise<any> {

        await queryRunner.dropTable("users");   

    };

}
