import { BadRequestException, Body, Controller, Get, Post } from '@nestjs/common';
import { UsersService } from './user.service';
import { User } from './user.entity';
import { Transactional } from 'typeorm-transactional';

@Controller('user')
export class UserController {

    constructor(private readonly userService: UsersService){}

    @Get()
    getUsers () {
        return this.userService.findAll();
    }

    @Transactional()
    @Post()
    async createUser (@Body() payload: {user: User}) {
        const user1 = await this.userService.create(payload.user);

        const user2 = await this.userService.create(payload.user);

        return [
            user1,
            user2,
        ]
    }
}
