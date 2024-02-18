import { Body, Controller, Get, Post } from '@nestjs/common';
import { UsersService } from './user.service';
import { Transactional } from 'typeorm-transactional';
import { CreateUserDTO } from './dtos/create-user.dto';

@Controller('user')
export class UserController {

    constructor(private readonly userService: UsersService){}

    @Get()
    getUsers () {
        return this.userService.findAll();
    }

    @Transactional()
    @Post()
    async createUser (@Body('user') createUserDto: CreateUserDTO) {
        const user = await this.userService.create(createUserDto);
        return user;
    }
}
