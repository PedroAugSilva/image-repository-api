import { Injectable } from '@nestjs/common';
import { User } from 'src/domain/entities/user.entity';
import { IUsersResporitory } from 'src/domain/repositories/users/users.repository';

@Injectable()
export class InMemoryUsersRepository implements IUsersResporitory {
  private readonly users: Map<string, User> = new Map();

  find(uuid: string): User {
    return this.users.get(uuid);
  }
  save(input: User): void {
    this.users.set(input.uuid, input);
  }
  findUserByEmail(email: string): User {
    const user = Array.from(this.users.values()).filter(
      (user) => user.email === email,
    )[0];

    return user;
  }
}
