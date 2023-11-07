import { Body, Controller, Post } from '@nestjs/common';
import { IAuthenticateUserDTO } from 'src/domain/use-cases/users/authenticate/dto/authenticate-user.dto';
import { AuthenticateUserUseCase } from './authenticate-user.use-case';
import { MissingParamError } from 'src/domain/errors/shared/missing-param-error.error';
import { UserNotFoundError } from 'src/domain/errors/users/user-not-found.error';
import { UnexpectedError } from 'src/domain/errors/shared/unexpected-error.error';

@Controller('login')
export class AuthenticateUserController {
  constructor(
    private readonly authenticateUserUseCase: AuthenticateUserUseCase,
  ) {}
  @Post()
  async handle(@Body() input: IAuthenticateUserDTO) {
    try {
      const result = await this.authenticateUserUseCase.execute(input);

      if (result instanceof MissingParamError) {
        throw result;
      }

      if (result instanceof UserNotFoundError) {
        throw result;
      }
      if (result) {
        return result;
      }
    } catch (error) {
      throw new UnexpectedError(error);
    }
  }
}
