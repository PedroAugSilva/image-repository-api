import { Global, Module } from '@nestjs/common';
import { ApiPrismaClientService } from './prisma.service';

@Global()
@Module({
  imports: [],
  controllers: [],
  providers: [ApiPrismaClientService],
  exports: [ApiPrismaClientService],
})
export class ApiPrismaClientModule {}
