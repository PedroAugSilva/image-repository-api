import { randomUUID } from 'crypto';

export class Post {
  uuid?: string;
  description: string;
  likes: number = 0;
  imageUrl: string;
  userUuid: string;
  updatedAt: Date;
  createdAt: Date;
  tags?: {
    name: string;
    postUuid: string;
  }[];
  comments?: {
    body: string;
    likes: number;
    createdAt: Date;
    updatedAt: Date;
    postUuid: string;
    userUuid: string;
  }[];

  constructor(props: Omit<Post, 'uuid'>, uuid?: string) {
    Object.assign(this, props);
    if (!uuid) {
      this.uuid = randomUUID();
    }
  }
}
