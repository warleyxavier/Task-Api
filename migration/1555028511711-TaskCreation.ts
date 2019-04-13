import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class TaskCreation1555028511711 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {

        await queryRunner.createTable(new Table({
            name: "tasks",
            columns: [
                {
                    name: "id",
                    type: "int",
                    isPrimary: true,
                    isGenerated: true,
                    isNullable: false,
                    isUnique: true,
                    
                },
                {
                    name: "description",
                    type: "varchar",
                    length: "100",
                    isNullable: false,
                },
                {
                    name: "estimate_at",
                    type: "timestamp",
                    default: "CURRENT_TIMESTAMP",
                },
                {
                    name: "done_at",
                    type: "timestamp",
                    default: "CURRENT_TIMESTAMP",
                },
                {
                    name: "user_id",
                    type: "integer",
                    isNullable: false,
                },
            ],
            foreignKeys: [
                {
                    name: "FK_tasks_user",
                    columnNames: ["user_id"],
                    referencedColumnNames: ["id"],
                    referencedTableName: "users",
                    onUpdate: "CASCADE",
                },
            ],            
        }), true);    

    }

    public async down(queryRunner: QueryRunner): Promise<any> {

        await queryRunner.dropTable("tasks");

    }

}
