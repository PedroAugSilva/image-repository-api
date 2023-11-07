import { BadRequestException, Body, Controller, Post } from '@nestjs/common';
import { ICreateUserDTO } from 'src/domain/use-cases/users/create/dto/create-user.dto';
import { CreateUserUseCase } from './create-user.use-case';
import { MissingParamError } from 'src/domain/errors/shared/missing-param-error.error';
import { AlreadyExistsUserError } from 'src/domain/errors/users/already-user-exists.error';

@Controller('register')
export class CreateUserController {
  constructor(private readonly createUserUseCase: CreateUserUseCase) {}
  @Post()
  async handle(@Body() input: ICreateUserDTO) {
    const result = await this.createUserUseCase.execute({
      ...input,
    });
    if (result === undefined) {
      return result;
    }
    if (result instanceof MissingParamError) {
      throw result;
    }
    if (result instanceof AlreadyExistsUserError) {
      throw result;
    }
    throw new BadRequestException(result);
  }
}
