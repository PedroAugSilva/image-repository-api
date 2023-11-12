import { randomUUID } from 'crypto';

export class User {
  uuid!: string;
  username!: string;
  firstname!: string;
  lastname!: string;
  email!: string;
  password!: string;
  photo?: string;
  updatedAt?: Date;

  constructor(props: Omit<User, 'uuid'>, uuid?: string) {
    Object.assign(this, props);
    if (!uuid) {
      this.uuid = randomUUID();
    }
  }
}
