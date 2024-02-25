import { Body, Controller, Get, Param, Post } from '@nestjs/common';
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

    @Get(':id')
    getUser (@Param('id') id: number) {
        return this.userService.findOne(id);
    }

    @Transactional()
    @Post()
    async createUser (@Body('user') createUserDto: CreateUserDTO) {
        const user = await this.userService.create(createUserDto);
        return user;
    }
}
