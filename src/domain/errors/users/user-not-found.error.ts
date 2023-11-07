import { Error } from 'src/infra/errors/shared/error.interface';

export class UserNotFoundError implements Error {
  public readonly name: string = 'User Not Found Error';
  public readonly reason: string =
    '[UserNotFoundError]: The user you are looking for does not exist';
}
