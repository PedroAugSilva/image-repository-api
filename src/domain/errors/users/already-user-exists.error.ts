import { Error } from 'src/infra/errors/shared/error.interface';

export class AlreadyExistsUserError implements Error {
  public readonly name: string = 'User Already Exists Error';
  public readonly reason: string =
    '[AlreadyExistsUserError]: The user you want to create already exists';
}
