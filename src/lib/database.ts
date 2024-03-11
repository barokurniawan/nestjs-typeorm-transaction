import { TypeOrmModule } from "@nestjs/typeorm";
import { DataSource } from "typeorm";
import { addTransactionalDataSource } from "typeorm-transactional";

export const DatabaseConfig = TypeOrmModule.forRootAsync({
    useFactory() {
        return {
            type: 'mysql',
            host: process.env.DB_HOST,
            port: +process.env.DB_PORT,
            username: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME,
            entities: ["dist/**/*.entity{.ts,.js}"],
            migrations: ["dist/migrations/*{.ts,.js}"],
            logging: true,
            synchronize: false,
            migrationsRun: false,
        };
    },
    async dataSourceFactory(options) {
        if (!options) {
            throw new Error('Invalid options passed');
        }

        return addTransactionalDataSource(new DataSource(options));
    },
});
