import { CommandFactory } from 'nest-commander';
import { AppModule } from './app.module';
import { StorageDriver, initializeTransactionalContext } from 'typeorm-transactional';

async function bootstrap() {
    initializeTransactionalContext({ storageDriver: StorageDriver.AUTO });
    await CommandFactory.run(AppModule, ['debug', 'log', 'error', 'warn']);
}

bootstrap();
