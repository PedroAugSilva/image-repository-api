import { Global, Module } from '@nestjs/common';
import { POSTS_REPOSITORY, USERS_REPOSITORY } from 'src/domain/di/repositories';
import { PrismaUsersRepository } from './users/prisma-users.repository';
import { PrismaPostsRepository } from './posts/prisma-posts.repository';

@Global()
@Module({
  providers: [
    {
      provide: USERS_REPOSITORY,
      useClass: PrismaUsersRepository,
    },
    {
      provide: POSTS_REPOSITORY,
      useClass: PrismaPostsRepository,
    },
  ],
  exports: [USERS_REPOSITORY, POSTS_REPOSITORY],
})
export class PrismaRepositoriesModule {}
