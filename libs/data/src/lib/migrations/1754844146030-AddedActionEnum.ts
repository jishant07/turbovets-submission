import { MigrationInterface, QueryRunner } from "typeorm";

export class AddedActionEnum1754844146030 implements MigrationInterface {
    name = 'AddedActionEnum1754844146030'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "permissions" DROP COLUMN "action"`);
        await queryRunner.query(`CREATE TYPE "public"."permissions_action_enum" AS ENUM('create', 'read', 'update', 'delete')`);
        await queryRunner.query(`ALTER TABLE "permissions" ADD "action" "public"."permissions_action_enum" NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "permissions" DROP COLUMN "action"`);
        await queryRunner.query(`DROP TYPE "public"."permissions_action_enum"`);
        await queryRunner.query(`ALTER TABLE "permissions" ADD "action" character varying NOT NULL`);
    }

}
