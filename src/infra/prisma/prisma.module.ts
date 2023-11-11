import { Global, Module } from '@nestjs/common';
import { ApiPrismaClientService } from './prisma.service';

@Global()
@Module({
  providers: [ApiPrismaClientService],
  exports: [ApiPrismaClientService],
})
export class ApiPrismaClientModule {}
