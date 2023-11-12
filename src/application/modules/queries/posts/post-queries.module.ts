import { Module } from '@nestjs/common';
import { FindAllController } from './find-all/find-all.controller';

@Module({
  controllers: [FindAllController],
})
export class PostQueriesModule {}
