import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { UsersService } from './user.service';
import { Transactional } from 'typeorm-transactional';
import { CreateUserDTO } from './dto/create-user.dto';

@Controller('user')
export class UserController {

    constructor(
        private readonly userService: UsersService,
    ) { }

    @Get()
    async getUsers(@Query() query?: { search?: string, page?: number, take?: number }) {
        const data = await this.userService.findAll(query?.search);
        return { data };
    }

    @Get(':id')
    async getUser(@Param('id') id: number) {
        const data = await this.userService.findOneById(id);
        return { data };
    }

    @Transactional()
    @Post()
    async createUser(@Body('user') createUserDto: CreateUserDTO) {
        const data = await this.userService.create(createUserDto);
        return { data };
    }
}
