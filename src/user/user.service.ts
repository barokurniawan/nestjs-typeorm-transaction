import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsWhere, Like, Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserDTO } from './dto/create-user.dto';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    @Inject(CACHE_MANAGER)
    private cacheManager: Cache
  ) { }

  findAll(search?: string): Promise<User[]> {
    let criteria: FindOptionsWhere<User> | FindOptionsWhere<User>[];
    if (search) {
      criteria = [
        { firstName: Like(`%${search}%`) },
        { email: Like(`%${search}%`) }
      ];
    }

    return this.usersRepository.find({
      where: criteria
    });
  }

  async findOneById(id: number): Promise<User | null> {
    const cacheKey = `findOneById:${id}`;
    const userData = await this.cacheManager.get<User>(cacheKey);
    if (userData) {
      return userData;
    }

    const row = await this.usersRepository.findOneBy({ id });
    await this.cacheManager.set(cacheKey, row, 300000);

    return row;
  }

  async findOneByEmail(email: string): Promise<User | null> {
    const cacheKey = `findOneByEmail:${email}`;
    const userData = await this.cacheManager.get<User>(cacheKey);
    if (userData) {
      return userData;
    }

    const row = await this.usersRepository.findOneBy({ email: email });
    await this.cacheManager.set(cacheKey, row, 300000);

    return row;
  }

  async remove(id: number): Promise<void> {
    await this.usersRepository.delete(id);
  }

  async create(user: CreateUserDTO) {
    return this.usersRepository.save(user);
  }
}
