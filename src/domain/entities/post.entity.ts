import { randomUUID } from 'crypto';

export class Post {
  uuid: string;
  body?: string;
  likes: number;
  imageUrl: string;
  userUuid: string;
  updatedAt: Date;
  createdAt: Date;
  tags?: {
    name: string;
    uuid: string;
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
