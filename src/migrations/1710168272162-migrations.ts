import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrations1710168272162 implements MigrationInterface {
    name = 'Migrations1710168272162'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`user\` (\`id\` int NOT NULL AUTO_INCREMENT, \`firstName\` varchar(255) NOT NULL, \`lastName\` varchar(255) NOT NULL, \`email\` varchar(255) NULL, \`password\` varchar(255) NOT NULL, \`isActive\` tinyint NOT NULL DEFAULT 1, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`product_category\` (\`id\` int NOT NULL AUTO_INCREMENT, \`categoryName\` varchar(255) NOT NULL, \`isActive\` tinyint NOT NULL DEFAULT 1, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`product\` (\`id\` int NOT NULL AUTO_INCREMENT, \`sku\` varchar(12) NOT NULL, \`productName\` varchar(255) NOT NULL, \`stockQty\` int NOT NULL DEFAULT '0', \`isActive\` tinyint NOT NULL DEFAULT 1, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`productCategoryId\` int NULL, \`userId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`contract_detail\` (\`id\` int NOT NULL AUTO_INCREMENT, \`amount\` int NOT NULL DEFAULT '0', \`contractId\` int NULL, \`productId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`contract\` (\`id\` int NOT NULL AUTO_INCREMENT, \`orderId\` varchar(255) NOT NULL, \`amount\` int NOT NULL DEFAULT '0', \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), UNIQUE INDEX \`IDX_56e4cd30f13b977b3d352a9b21\` (\`orderId\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`payment\` (\`id\` int NOT NULL AUTO_INCREMENT, \`amount\` int NOT NULL, \`paymentMethod\` varchar(255) NOT NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`contractId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`product_stock\` (\`id\` int NOT NULL AUTO_INCREMENT, \`entryType\` int NOT NULL, \`stockQty\` int NOT NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`productId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`product\` ADD CONSTRAINT \`FK_618194d24a7ea86a165d7ec628e\` FOREIGN KEY (\`productCategoryId\`) REFERENCES \`product_category\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`product\` ADD CONSTRAINT \`FK_329b8ae12068b23da547d3b4798\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`contract_detail\` ADD CONSTRAINT \`FK_df91b68d679de4926e242ff10b0\` FOREIGN KEY (\`contractId\`) REFERENCES \`contract\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`contract_detail\` ADD CONSTRAINT \`FK_65a3b383e7b4d47cf0e0559f7a2\` FOREIGN KEY (\`productId\`) REFERENCES \`product\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`payment\` ADD CONSTRAINT \`FK_c1df8de04d7066a79ba54031aec\` FOREIGN KEY (\`contractId\`) REFERENCES \`contract\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`product_stock\` ADD CONSTRAINT \`FK_6d782c52c11043659e1182b33db\` FOREIGN KEY (\`productId\`) REFERENCES \`product\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`product_stock\` DROP FOREIGN KEY \`FK_6d782c52c11043659e1182b33db\``);
        await queryRunner.query(`ALTER TABLE \`payment\` DROP FOREIGN KEY \`FK_c1df8de04d7066a79ba54031aec\``);
        await queryRunner.query(`ALTER TABLE \`contract_detail\` DROP FOREIGN KEY \`FK_65a3b383e7b4d47cf0e0559f7a2\``);
        await queryRunner.query(`ALTER TABLE \`contract_detail\` DROP FOREIGN KEY \`FK_df91b68d679de4926e242ff10b0\``);
        await queryRunner.query(`ALTER TABLE \`product\` DROP FOREIGN KEY \`FK_329b8ae12068b23da547d3b4798\``);
        await queryRunner.query(`ALTER TABLE \`product\` DROP FOREIGN KEY \`FK_618194d24a7ea86a165d7ec628e\``);
        await queryRunner.query(`DROP TABLE \`product_stock\``);
        await queryRunner.query(`DROP TABLE \`payment\``);
        await queryRunner.query(`DROP INDEX \`IDX_56e4cd30f13b977b3d352a9b21\` ON \`contract\``);
        await queryRunner.query(`DROP TABLE \`contract\``);
        await queryRunner.query(`DROP TABLE \`contract_detail\``);
        await queryRunner.query(`DROP TABLE \`product\``);
        await queryRunner.query(`DROP TABLE \`product_category\``);
        await queryRunner.query(`DROP TABLE \`user\``);
    }

}
