import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrations1710170160084 implements MigrationInterface {
    name = 'Migrations1710170160084'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`lastName\` \`lastName\` varchar(255) NOT NULL COMMENT 'this is a lastname of an user'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`lastName\` \`lastName\` varchar(255) NOT NULL`);
    }

}
