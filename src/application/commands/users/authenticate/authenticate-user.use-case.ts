import { Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { USERS_REPOSITORY } from 'src/domain/di/repositories';
import { MissingParamError } from 'src/domain/errors/shared/missing-param-error.error';
import { UnexpectedError } from 'src/domain/errors/shared/unexpected-error.error';
import { PasswordDoesNotMatchError } from 'src/domain/errors/users/password-does-not-match.error';
import { UserNotFoundError } from 'src/domain/errors/users/user-not-found.error';
import { IUsersResporitory } from 'src/domain/repositories/users/users.repository';
import { IAuthenticateUserUseCase } from 'src/domain/use-cases/users/authenticate/authenticate-user.use-case';
import {
  IAuthenticateUserDTO,
  OAuthenticateUserDTO,
} from 'src/domain/use-cases/users/authenticate/dto/authenticate-user.dto';

@Injectable()
export class AuthenticateUserUseCase implements IAuthenticateUserUseCase {
  constructor(
    @Inject(USERS_REPOSITORY)
    private readonly usersRepository: IUsersResporitory,
    private readonly jwtService: JwtService,
  ) {}
  async execute(input: IAuthenticateUserDTO): Promise<OAuthenticateUserDTO> {
    try {
      if (!input.email) {
        return new MissingParamError('email');
      }
      const user = await this.usersRepository.findUserByEmail(input.email);
      if (!user) {
        return new UserNotFoundError();
      }
      if (!input.password) {
        return new MissingParamError('password');
      }
      if (user.password !== input.password) {
        return new PasswordDoesNotMatchError();
      }

      const accessToken = await this.jwtService.signAsync({});
      const name = `${user.firstname} ${user.lastname}`;
      return {
        accessToken,
        user: {
          name,
          email: user.email,
          uuid: user.uuid,
          photo: user.photo,
        },
      };
    } catch (error) {
      return new UnexpectedError(error);
    }
  }
}
