import { Post } from 'src/domain/entities/post.entity';

export interface IPostsRepostory {
  save(input: Post): Promise<void> | void;
}
