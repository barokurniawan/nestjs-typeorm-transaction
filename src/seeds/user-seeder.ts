import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { DataSource } from 'typeorm';
import { User } from 'src/user/entities/user.entity';
import UsmCrypto from 'src/lib/usm-crypto';

export default class UserSeeder implements Seeder {
  public async run(
    dataSource: DataSource,
    factoryManager: SeederFactoryManager,
  ): Promise<void> {
        const user = new User();
        user.firstName = "John";
        user.lastName = "Maxwel";
        user.email = "johndoe@local.dev";
        user.password = await UsmCrypto.encrypt("password");

        const userRepo = dataSource.getRepository(User);
        await userRepo.save(user);
  }
}
