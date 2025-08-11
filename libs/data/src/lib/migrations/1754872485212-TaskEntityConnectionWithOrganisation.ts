import { MigrationInterface, QueryRunner } from "typeorm";

export class TaskEntityConnectionWithOrganisation1754872485212 implements MigrationInterface {
    name = 'TaskEntityConnectionWithOrganisation1754872485212'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tasks" ADD "organisation_id" uuid`);
        await queryRunner.query(`ALTER TABLE "tasks" ADD CONSTRAINT "FK_ea46985a8c7921288fb2cb694f2" FOREIGN KEY ("organisation_id") REFERENCES "organisations"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tasks" DROP CONSTRAINT "FK_ea46985a8c7921288fb2cb694f2"`);
        await queryRunner.query(`ALTER TABLE "tasks" DROP COLUMN "organisation_id"`);
    }

}
