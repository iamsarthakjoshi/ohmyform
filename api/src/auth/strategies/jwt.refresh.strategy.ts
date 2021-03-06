import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { jwtConstants } from '../constants';
import { AuthService } from "../services/auth.service"
import { AuthUser } from "../interfaces/auth.user.interface"

@Injectable()
export class JwtRefreshStrategy extends PassportStrategy(Strategy, 'jwt.refresh') {
  constructor(private readonly authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtConstants.secret,
    });
  }

  async validate(payload: any): Promise<AuthUser | null> {
    if (!payload.refresh) {
      return null
    }

    // TODO add refresh token invalidation uppon usage! They should only work once
    return this.authService.validate(payload.username);
  }
}
