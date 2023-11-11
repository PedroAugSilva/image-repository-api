import { Post } from 'src/domain/entities/post.entity';
import { IPostsRepostory } from 'src/domain/repositories/posts/posts.repository';

export class InMemoryPostsRepository implements IPostsRepostory {
  private readonly posts: Map<string, Post> = new Map();
  save(input: Post): void {
    this.posts.set(input.uuid, input);
  }
}
