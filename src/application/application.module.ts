import { Module } from '@nestjs/common';
import { ApiPrismaClientModule } from 'src/infra/prisma/prisma.module';
import { CommandsModule } from './commands/commands.module';
import { PrismaRepositoriesModule } from 'src/infra/repositories/prisma-repositories.module';
import { SupabaseModule } from 'src/infra/supabase/supabase.module';

@Module({
  imports: [
    ApiPrismaClientModule,
    CommandsModule,
    PrismaRepositoriesModule,
    SupabaseModule,
  ],
})
export class ApplicationModule {}
