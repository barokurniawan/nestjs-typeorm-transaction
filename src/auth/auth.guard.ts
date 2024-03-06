import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Request } from 'express';
import AuthGuardSetting from './setting.guard';
import { JwtService } from '@nestjs/jwt';
import { jwtConstants } from './constants';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private jwtService: JwtService) { }

  async canActivate(
    context: ExecutionContext,
  ) {
    const request = context.switchToHttp().getRequest<Request>();
    const token = this.extractTokenFromHeader(request);
    const isExcluded = this.isExcluded(request.path);

    if (!token && !isExcluded) {
      throw new UnauthorizedException();
    }

    if (isExcluded) {
      return true;
    }

    const payload = await this.jwtService.verifyAsync(
      token,
      { secret: jwtConstants.secret }
    );

    console.log("payload", payload);
    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }

  private isExcluded(path: string) {
    return AuthGuardSetting.excludedPaths.includes(path);
  }
}
