import { Injectable, NestMiddleware } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import UsmCrypto from 'src/lib/usm-crypto';
import { UsersService } from 'src/user/user.service';

@Injectable()
export class AuthMiddleware implements NestMiddleware {

    constructor(
        private jwtService: JwtService,
        private userService: UsersService
    ) { }

    async use(req: any, res: any, next: () => void) {
        const token = req.headers.authorization?.split(' ')[1];
        if (token) {
            try {
                const userCrypto = await UsmCrypto.verifyToken(this.jwtService, token, { allowEmpty: true });
                if (userCrypto) {
                    const user = await this.userService.findOneByEmail(userCrypto.sub);
                    req.user = user;
                }
            } catch (error) {
                console.error('Error verifying token:', error);
            }
        }

        next();
    }
}
