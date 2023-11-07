import { Test, TestingModule } from '@nestjs/testing';
import { InMemoryRepositoriesModule } from 'src/infra/repositories/in-memory-repositories.module';
import { beforeAll, describe, it, expect } from 'vitest';
import { AuthenticateUserUseCase } from './authenticate-user.use-case';
import { IUsersResporitory } from 'src/domain/repositories/users/users.repository';
import { USERS_REPOSITORY } from 'src/domain/di/repositories';
import { User } from 'src/domain/entities/user.entity';
import { MissingParamError } from 'src/domain/errors/shared/missing-param-error.error';
import { UserNotFoundError } from 'src/domain/errors/users/user-not-found.error';
import { PasswordDoesNotMatchError } from 'src/domain/errors/users/password-does-not-match.error';

describe('authentication of user', () => {
  let authenticateUserUseCase: AuthenticateUserUseCase;
  let userRepository: IUsersResporitory;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [InMemoryRepositoriesModule],
      providers: [AuthenticateUserUseCase],
    }).compile();

    authenticateUserUseCase = module.get<AuthenticateUserUseCase>(
      AuthenticateUserUseCase,
    );
    userRepository = module.get<IUsersResporitory>(USERS_REPOSITORY);

    userRepository.save(
      new User({
        firstname: 'Pedro',
        lastname: 'Silva',
        email: 'pedroaugustosilva.880@gmail.com',
        password: 'pedro6089',
      }),
    );
  });

  it('should be able sign in the system', async () => {
    const result = await authenticateUserUseCase.execute({
      email: 'pedroaugustosilva.880@gmail.com',
      password: 'pedro6089',
    });

    expect(result).toBeTypeOf('object');
  });
  it(`shouldn't be able sign in the system if the password is not proveided`, async () => {
    const result = await authenticateUserUseCase.execute({
      email: 'pedroaugustosilva.880@gmail.com',
      password: '',
    });

    expect(result).toBeInstanceOf(MissingParamError);
  });
  it(`shouldn't be able sign in the system if the email is not proveided`, async () => {
    const result = await authenticateUserUseCase.execute({
      email: '',
      password: 'pedro6089',
    });

    expect(result).toBeInstanceOf(MissingParamError);
  });
  it(`shouldn't be able sign in the system if the user not exits`, async () => {
    const result = await authenticateUserUseCase.execute({
      email: 'nouser@hotmail.com',
      password: 'pedro6089',
    });

    expect(result).toBeInstanceOf(UserNotFoundError);
  });

  it(`shouldn't be able sign in the system if the password is incorrect`, async () => {
    const result = await authenticateUserUseCase.execute({
      email: 'pedroaugustosilva.880@gmail.com',
      password: 'incorrect password',
    });

    expect(result).toBeInstanceOf(PasswordDoesNotMatchError);
  });
});
