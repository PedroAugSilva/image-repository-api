import { MissingParamError } from 'src/domain/errors/shared/missing-param-error.error';
import { UnexpectedError } from 'src/domain/errors/shared/unexpected-error.error';
import { AlreadyExistsUserError } from 'src/domain/errors/users/already-user-exists.error';

export interface ICreateUserDTO {
  username: string;
  firstname: string;
  lastname: string;
  email: string;
  password: string;
}
export type OCreateUserDTO =
  | MissingParamError
  | UnexpectedError
  | AlreadyExistsUserError
  | void;
