import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import UsmCrypto from 'src/lib/usm-crypto';
import { UsersService } from 'src/user/user.service';

@Injectable()
export class AuthService {

    constructor(
        private userService: UsersService,
        private jwtService: JwtService
    ) { }

    async logIn(email: string, password: string) {
        const user = await this.userService.findOneByEmail(email);
        if (!user) {
            throw new BadRequestException("Invalid username or password");
        }

        const isMatch = await UsmCrypto.compare(password, user.password);
        if (!isMatch) {
            throw new BadRequestException("Invalid username or password");
        }

        const payload = { sub: user.email, firstName: user.firstName };
        return {
            access_token: await this.jwtService.signAsync(payload),
        };
    }
}
