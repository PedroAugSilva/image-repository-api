import { Global, Module } from '@nestjs/common';
import { USERS_REPOSITORY } from 'src/domain/di/repositories';
import { PrismaUsersRepository } from './users/prisma-users.repository';

@Global()
@Module({
  providers: [
    {
      provide: USERS_REPOSITORY,
      useClass: PrismaUsersRepository,
    },
  ],
  exports: [USERS_REPOSITORY],
})
export class PrismaRepositoriesModule {}
