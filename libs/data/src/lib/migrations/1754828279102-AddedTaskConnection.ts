import { MigrationInterface, QueryRunner } from "typeorm";

export class AddedTaskConnection1754828279102 implements MigrationInterface {
    name = 'AddedTaskConnection1754828279102'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ADD "tasksId" uuid`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "FK_0b747f877bc9ffcce5e162a7591" FOREIGN KEY ("tasksId") REFERENCES "tasks"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "FK_0b747f877bc9ffcce5e162a7591"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "tasksId"`);
    }

}
