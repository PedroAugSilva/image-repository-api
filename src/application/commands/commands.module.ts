import { Module } from '@nestjs/common';
import { UserCommandsModule } from './users/user-commands.module';

@Module({
  imports: [UserCommandsModule],
})
export class CommandsModule {}
