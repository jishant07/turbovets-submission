import { MigrationInterface, QueryRunner } from "typeorm";

export class TaskEntityAlter1754860110568 implements MigrationInterface {
    name = 'TaskEntityAlter1754860110568'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tasks" ADD "description" character varying NOT NULL`);
        await queryRunner.query(`CREATE TYPE "public"."tasks_taskstatus_enum" AS ENUM('todo', 'inprogress', 'blocked', 'review', 'done')`);
        await queryRunner.query(`ALTER TABLE "tasks" ADD "taskStatus" "public"."tasks_taskstatus_enum" NOT NULL DEFAULT 'todo'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tasks" DROP COLUMN "taskStatus"`);
        await queryRunner.query(`DROP TYPE "public"."tasks_taskstatus_enum"`);
        await queryRunner.query(`ALTER TABLE "tasks" DROP COLUMN "description"`);
    }

}
