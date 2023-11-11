import { Inject, Injectable } from '@nestjs/common';
import { POSTS_REPOSITORY, USERS_REPOSITORY } from 'src/domain/di/repositories';
import { Post } from 'src/domain/entities/post.entity';
import { MissingParamError } from 'src/domain/errors/shared/missing-param-error.error';
import { UnexpectedError } from 'src/domain/errors/shared/unexpected-error.error';
import { UserNotFoundError } from 'src/domain/errors/users/user-not-found.error';
import { IPostsRepostory } from 'src/domain/repositories/posts/posts.repository';
import { IUsersResporitory } from 'src/domain/repositories/users/users.repository';
import { ICreatePostUseCase } from 'src/domain/use-cases/posts/create/create-post.use-case';
import {
  ICreatePostDTO,
  OCreatePostDTO,
} from 'src/domain/use-cases/posts/create/dto/create-post.dto';
import { SupabaseService } from 'src/infra/supabase/supabase.service';

@Injectable()
export class CreatePostUseCase implements ICreatePostUseCase {
  constructor(
    @Inject(POSTS_REPOSITORY)
    private readonly postsRepository: IPostsRepostory,
    @Inject(USERS_REPOSITORY)
    private readonly usersRepositoy: IUsersResporitory,
    private readonly supabase: SupabaseService,
  ) {}

  async execute(input: ICreatePostDTO): Promise<OCreatePostDTO> {
    try {
      if (!input.image) return new MissingParamError('image');
      if (!input.userUuid) return new MissingParamError('user uuid');
      const user = await this.usersRepositoy.find(input.userUuid);
      if (!user) return new UserNotFoundError();

      const imageUrl = await this.supabase.upload('feed-image', input.image);

      const post = new Post({
        ...input,
        imageUrl: imageUrl,
        createdAt: new Date(),
        updatedAt: new Date(),
        likes: 0,
      });

      await this.postsRepository.save(post);
      console.log(input);
      return undefined;
    } catch (error) {
      return new UnexpectedError(error);
    }
  }
}
