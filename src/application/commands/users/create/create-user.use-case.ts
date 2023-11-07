import { Inject, Injectable } from '@nestjs/common';
import { USERS_REPOSITORY } from 'src/domain/di/repositories';

import { User } from 'src/domain/entities/user.entity';
import { MissingParamError } from 'src/domain/errors/shared/missing-param-error.error';
import { UnexpectedError } from 'src/domain/errors/shared/unexpected-error.error';
import { AlreadyExistsUserError } from 'src/domain/errors/users/already-user-exists.error';
import { IUsersResporitory } from 'src/domain/repositories/users/users.repository';
import { ICreateUserUseCase } from 'src/domain/use-cases/users/create/create-user.use-case';
import {
  ICreateUserDTO,
  OCreateUserUseCaseDTO,
} from 'src/domain/use-cases/users/create/dto/create-user.dto';

@Injectable()
export class CreateUserUseCase implements ICreateUserUseCase {
  constructor(
    @Inject(USERS_REPOSITORY)
    private readonly usersRepository: IUsersResporitory,
  ) {}

  async execute(input: ICreateUserDTO): Promise<OCreateUserUseCaseDTO> {
    try {
      if (!input.email) {
        return new MissingParamError('email');
      }

      const user = await this.usersRepository.findUserByEmail(input.email);
      if (user) {
        return new AlreadyExistsUserError();
      }

      if (!input.firstname) {
        return new MissingParamError('name');
      }

      if (!input.lastname) {
        return new MissingParamError('lastname');
      }
      if (!input.password) {
        return new MissingParamError('password');
      }

      const newUser = new User({
        firstname: input.firstname,
        lastname: input.lastname,
        email: input.email,
        password: input.password,
      });
      // console.log(newUser);
      await this.usersRepository.save(newUser);
      return undefined;
    } catch (error) {
      throw new UnexpectedError(error);
    }
  }
}
