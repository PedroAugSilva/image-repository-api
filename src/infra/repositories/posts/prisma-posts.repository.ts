import { Injectable } from '@nestjs/common';
import { Post } from 'src/domain/entities/post.entity';
import { IPostsRepostory } from 'src/domain/repositories/posts/posts.repository';
import { ApiPrismaClientService } from 'src/infra/prisma/prisma.service';

@Injectable()
export class PrismaPostsRepository implements IPostsRepostory {
  constructor(private readonly prisma: ApiPrismaClientService) {}

  async save(input: Post): Promise<void> {
    await this.prisma.post.create({
      data: {
        imageUrl: input.imageUrl,
        uuid: input.uuid,
        body: input.body,
        userUuid: input.userUuid,
        tags: {
          ...(input.tags && {
            createMany: {
              data: input.tags.map((tag) => ({
                name: tag.name,
                uuid: tag.uuid,
              })),
            },
          }),
        },
      },
    });
  }
}
