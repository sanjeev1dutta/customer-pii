import { AuthCredentialDto } from './dto/auth-credential.dto';
import { User } from './user.entity';
import { EntityRepository, Repository } from 'typeorm';
// import {
//   ConflictException,
//   InternalServerErrorException,
// } from '@nestjs/common';
// import * as bcrypt from 'bcrypt';
// import { v4 as uuid } from 'uuid';
// import { AuthSignUpDto } from './dto/auth-signup.dto';

@EntityRepository(User)
export class AuthRepository extends Repository<User> {
  async validateUserPassword(
    authCredentialDto: AuthCredentialDto,
  ): Promise<string> {
    const { username, password } = authCredentialDto;
    const user = await this.findOne({ username });

    if (user && (await user.validatePassword(password))) {
      return user.username;
    } else {
      return null;
    }
  }

  // private async hashPassword(password: string, salt: string): Promise<string> {
  //   return bcrypt.hash(password, salt);
  // }
}
