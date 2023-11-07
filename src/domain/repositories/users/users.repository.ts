import { User } from 'src/domain/entities/user.entity';

export interface IUsersResporitory {
  save(input: User): Promise<void> | void;
  find(uuid: string): null | User | Promise<User | null>;
  findUserByEmail(email: string): null | User | Promise<User | null>;
}
