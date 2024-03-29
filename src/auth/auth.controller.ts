import { Body, Controller, Post } from '@nestjs/common';
import LoginDto from './dtos/login.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {

    constructor(private authService: AuthService) { }

    @Post('/login')
    login(@Body() login: LoginDto) {
        return this.authService.logIn(login.email, login.password);
    }
}
