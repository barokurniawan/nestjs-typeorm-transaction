import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsWhere, Like, Repository } from 'typeorm';
import { User } from './user.entity';
import { CreateUserDTO } from './dtos/create-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
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

  findOneById(id: number): Promise<User | null> {
    return this.usersRepository.findOneBy({ id });
  }

  findOneByEmail(email: string): Promise<User | null> {
    return this.usersRepository.findOneBy({ email: email });
  }

  async remove(id: number): Promise<void> {
    await this.usersRepository.delete(id);
  }

  async create(user: CreateUserDTO) {
    return this.usersRepository.save(user);
  }
}
