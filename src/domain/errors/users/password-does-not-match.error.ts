import { Error } from 'src/infra/errors/shared/error.interface';

export class PasswordDoesNotMatchError implements Error {
  public readonly name: string = 'Password Does Not Match';
  public readonly reason: string =
    '[PasswordDoesNotMatch]: The password entered does not match the user';
}
