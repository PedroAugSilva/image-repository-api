import { Test, TestingModule } from '@nestjs/testing';
import { InMemoryRepositoriesModule } from 'src/infra/repositories/in-memory-repositories.module';
import { describe, beforeAll, it, expect } from 'vitest';
import { CreatePostUseCase } from './create-post.use-case';
import { IUsersResporitory } from 'src/domain/repositories/users/users.repository';
import { USERS_REPOSITORY } from 'src/domain/di/repositories';
import { User } from 'src/domain/entities/user.entity';
import { MissingParamError } from 'src/domain/errors/shared/missing-param-error.error';
import { UserNotFoundError } from 'src/domain/errors/users/user-not-found.error';
import { Readable } from 'stream';

describe('create a post', () => {
  let createPostUseCase: CreatePostUseCase;
  let usersRepositoy: IUsersResporitory;

  const user = new User({
    email: 'test.880@gmail.com',
    firstname: 'test',
    lastname: 'test',
    password: 'test6089',
  });

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [InMemoryRepositoriesModule],
      providers: [CreatePostUseCase],
    }).compile();

    createPostUseCase = module.get<CreatePostUseCase>(CreatePostUseCase);

    usersRepositoy = module.get<IUsersResporitory>(USERS_REPOSITORY);

    usersRepositoy.save(user);
  });

  it(`it should be able to create a new post`, async () => {
    const result = await createPostUseCase.execute({
      image: {
        buffer: 'buffer' as unknown as Buffer,
        destination: 'example destination',
        fieldname: 'example fieldname',
        filename: 'example filename',
        mimetype: '7bit',
        originalname: 'example orignal name',
        path: 'example path.png',
        size: 21313,
        stream: '' as unknown as Readable,
        encoding: 'example encoding',
      },
      userUuid: user.uuid,
    });
    expect(result).toBeUndefined();
  });
  it(`it shouldn't be able to create a new post if the field "imageUrl" isn't provided`, async () => {
    const result = await createPostUseCase.execute({
      image: null,
      userUuid: user.uuid,
    });
    expect(result).toBeInstanceOf(MissingParamError);
  });
  it(`it shouldn't be able to create a new post if the field "userUuid" isn't provided`, async () => {
    const result = await createPostUseCase.execute({
      image: {
        buffer: 'buffer' as unknown as Buffer,
        destination: 'example destination',
        fieldname: 'example fieldname',
        filename: 'example filename',
        mimetype: '7bit',
        originalname: 'example orignal name',
        path: 'example path.png',
        size: 21313,
        stream: '' as unknown as Readable,
        encoding: 'example encoding',
      },
      userUuid: null,
    });
    expect(result).toBeInstanceOf(MissingParamError);
  });
  it(`it shouldn't be able to create a new post if the user not exists`, async () => {
    const result = await createPostUseCase.execute({
      image: {
        buffer: 'buffer' as unknown as Buffer,
        destination: 'example destination',
        fieldname: 'example fieldname',
        filename: 'example filename',
        mimetype: '7bit',
        originalname: 'example orignal name',
        path: 'example path.png',
        size: 21313,
        stream: '' as unknown as Readable,
        encoding: 'example encoding',
      },
      userUuid: 'invalid uuid',
    });
    expect(result).toBeInstanceOf(UserNotFoundError);
  });
});
