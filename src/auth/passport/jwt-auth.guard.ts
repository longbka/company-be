import {
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { IS_PUBLIC_KEY } from '../../decorator/customize';
import { User } from '@/modules/users/schema/user.schema';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(private reflector: Reflector) {
    super();
  }

  canActivate(context: ExecutionContext) {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (isPublic) {
      return true;
    }
    return super.canActivate(context);
  }

  handleRequest<TUser extends User | null>(
    err: Error | null,
    user: TUser,
  ): TUser {
    if (err || !user || user?.role !== 'admin') {
      throw (
        err ||
        new UnauthorizedException(
          'Access token invalid or insufficient permissions!',
        )
      );
    }
    return user;
  }
}
