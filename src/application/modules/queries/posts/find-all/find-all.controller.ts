import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthorizationGuard } from 'src/application/common/guards/authorization.guard';
import { ApiPrismaClientService } from 'src/infra/prisma/prisma.service';

@UseGuards(AuthorizationGuard)
@Controller('posts')
export class FindAllController {
  constructor(private readonly prisma: ApiPrismaClientService) {}

  @Get()
  async handle() {
    const posts = await this.prisma.post.findMany({
      select: {
        uuid: true,
        body: true,
        imageUrl: true,
        createdAt: true,
        likes: true,
        user: {
          select: {
            photo: true,
            firstname: true,
            lastname: true,
            username: true,
          },
        },
        tags: {
          select: {
            name: true,
          },
        },
      },
    });

    if (!posts) return null;

    return posts.map((post) => ({
      ...post,
      user: {
        photo: post.user.photo,
        name: `${post.user.firstname} ${post.user.firstname}`,
        username: post.user.username,
      },
    }));
  }
}
