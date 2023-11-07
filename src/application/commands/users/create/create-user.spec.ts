import { describe, it, beforeAll, expect } from 'vitest';
import { Test, TestingModule } from '@nestjs/testing';
import { CreateUserUseCase } from './create-user.use-case';
import { InMemoryRepositoriesModule } from 'src/infra/repositories/in-memory-repositories.module';
import { MissingParamError } from 'src/domain/errors/shared/missing-param-error.error';

describe('create a new user [client or seller]:', () => {
  let createUserUseCase: CreateUserUseCase;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [InMemoryRepositoriesModule],
      providers: [CreateUserUseCase],
    }).compile();

    createUserUseCase = module.get<CreateUserUseCase>(CreateUserUseCase);
  });

  it('should be able create a new client', async () => {
    const result = await createUserUseCase.execute({
      firstname: 'Pedro',
      lastname: 'Silva',
      email: 'client@client.com',
      password: 'pedro6089',
    });

    expect(result).toBeUndefined();
  });

  it(`shouldn't be able create a new client if a field 'name' not provided`, async () => {
    const result = await createUserUseCase.execute({
      firstname: '',
      lastname: 'Silva',
      email: 'client1@client.com',
      password: 'pedro6089',
    });

    expect(result).toBeInstanceOf(MissingParamError);
  });
  it(`shouldn't be able create a new client if a field 'last name' not provided`, async () => {
    const result = await createUserUseCase.execute({
      firstname: 'Pedro',
      lastname: null,
      email: 'client2@client.com',
      password: 'pedro6089',
    });

    expect(result).toBeInstanceOf(MissingParamError);
  });
  it(`shouldn't be able create a new client if a field 'email' not provided`, async () => {
    const result = await createUserUseCase.execute({
      firstname: 'Pedro',
      lastname: 'Silva',
      email: '',
      password: 'pedro6089',
    });

    expect(result).toBeInstanceOf(MissingParamError);
  });

  it(`shouldn't be able create a new client if a field 'password' not provided`, async () => {
    const result = await createUserUseCase.execute({
      firstname: 'Pedro',
      lastname: 'Silva',
      email: 'client4@client.com',
      password: '',
    });

    expect(result).toBeInstanceOf(MissingParamError);
  });
});
