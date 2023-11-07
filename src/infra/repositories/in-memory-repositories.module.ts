import { Global, Module } from '@nestjs/common';
import { USERS_REPOSITORY } from 'src/domain/di/repositories';
import { InMemoryUsersRepository } from './users/in-memory-users.repository';

@Global()
@Module({
  providers: [
    {
      provide: USERS_REPOSITORY,
      useClass: InMemoryUsersRepository,
    },
  ],
  exports: [USERS_REPOSITORY],
})
export class InMemoryRepositoriesModule {}
