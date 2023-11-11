import { Module } from '@nestjs/common';
import { UserCommandsModule } from './users/user-commands.module';
import { PostCommandsModule } from './posts/post-commands.module';

@Module({
  imports: [UserCommandsModule, PostCommandsModule],
})
export class CommandsModule {}
