import { AuthCredentialDto } from './dto/auth-credential.dto';
import { AuthRepository } from './auth.repository';
import { HttpService, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './jwt-payload.interface';
import { ApiClient } from './utility/api-client.utility';
import * as config from 'config';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(AuthRepository)
    private userRepository: AuthRepository,
    private http: HttpService,
    private jwtService: JwtService,
  ) {}

  async signIn(
    authCredentialDto: AuthCredentialDto,
  ): Promise<{ accessToken: string }> {
    const username = authCredentialDto.username;
    const tokenPayload: JwtPayload = { username };
    const accessToken = await this.jwtService.sign(tokenPayload);
    return { accessToken };
  }

  getUser(username: string): Promise<any> {
    const custEndpointUrl = `${config.get('auth.url')}/${username}`;
    const client = new ApiClient(this.http);
    return client.get(custEndpointUrl);
  }
}
