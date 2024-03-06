import { Body, ClassSerializerInterceptor, Controller, Get, Param, Post, UseInterceptors } from '@nestjs/common';
import { UsersService } from './user.service';
import { Transactional } from 'typeorm-transactional';
import { CreateUserDTO } from './dtos/create-user.dto';

@Controller('user')
export class UserController {

    constructor(private readonly userService: UsersService) { }

    @UseInterceptors(ClassSerializerInterceptor)
    @Get()
    async getUsers() {
        return {
            data: await this.userService.findAll(),
        };
    }

    @Get(':id')
    getUser(@Param('id') id: number) {
        return this.userService.findOneById(id);
    }

    @Transactional()
    @Post()
    async createUser(@Body('user') createUserDto: CreateUserDTO) {
        const user = await this.userService.create(createUserDto);
        return user;
    }
}
