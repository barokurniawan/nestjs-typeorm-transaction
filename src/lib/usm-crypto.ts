import { UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { jwtConstants } from 'src/auth/constants';
import UserCrypto from './types/user-crypto';

class UsmCrypto {

    static readonly saltOrRounds = 10;

    public static encrypt(password: string) {
        return bcrypt.hash(password, UsmCrypto.saltOrRounds);
    }

    public static compare(password: string, hash: string) {
        return bcrypt.compare(password, hash);
    }

    public static async verifyToken(jwtService: JwtService, token: string, opt?: { allowEmpty?: boolean }): Promise<UserCrypto | null> {
        let user = null;
        if (opt?.allowEmpty && !token) {
            return null;
        }

        try {
            user = await jwtService.verifyAsync(
                token,
                { secret: jwtConstants.secret }
            );
        } catch (error) {
            throw new UnauthorizedException("Unable to verify the token");
        }

        return {
            sub: user.sub,
            firstName: user.firstName,
            iat: user.iat
        };
    }
}

export default UsmCrypto;