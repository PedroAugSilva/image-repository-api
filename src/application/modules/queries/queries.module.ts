import { Module } from '@nestjs/common';
import { PostQueriesModule } from './posts/post-queries.module';
@Module({
  imports: [PostQueriesModule],
})
export class QueriesModule {}
