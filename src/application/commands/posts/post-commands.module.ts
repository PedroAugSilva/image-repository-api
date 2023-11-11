import { Module } from '@nestjs/common';
import { CreatePostController } from './create/create-post.controller';
import { CreatePostUseCase } from './create/create-post.use-case';

@Module({
  controllers: [CreatePostController],
  providers: [CreatePostUseCase],
})
export class PostCommandsModule {}
