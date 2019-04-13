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
            ],
        }), true).then( () => {
            console.log("Table user created")
        }).catch(error => console.log(error));    

    };

    public async down(queryRunner: QueryRunner): Promise<any> {

        await queryRunner.dropTable("users");   

    };

}
