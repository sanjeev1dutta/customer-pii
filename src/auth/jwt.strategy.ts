import { JwtPayload } from './jwt-payload.interface';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import * as config from 'config';
import { User } from './user';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET || config.get('jwt.secret'),
    });
  }

  async validate(payload: JwtPayload): Promise<any> {
    const { id, username } = payload;

    const user: User = new User();
    user.id = id;
    user.username = username;

    if (!id || !username) {
      console.log('invalid token');
      throw new UnauthorizedException();
    } else {
      return user;
    }
  }
}
