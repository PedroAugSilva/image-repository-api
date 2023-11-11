import { Global, Module } from '@nestjs/common';
import { POSTS_REPOSITORY, USERS_REPOSITORY } from 'src/domain/di/repositories';
import { InMemoryUsersRepository } from './users/in-memory-users.repository';
import { InMemoryPostsRepository } from './posts/in-memory-posts.repository';

@Global()
@Module({
  providers: [
    {
      provide: USERS_REPOSITORY,
      useClass: InMemoryUsersRepository,
    },
    {
      provide: POSTS_REPOSITORY,
      useClass: InMemoryPostsRepository,
    },
  ],
  exports: [USERS_REPOSITORY, POSTS_REPOSITORY],
})
export class InMemoryRepositoriesModule {}
