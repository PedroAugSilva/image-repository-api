import { MissingParamError } from 'src/domain/errors/shared/missing-param-error.error';
import { UnexpectedError } from 'src/domain/errors/shared/unexpected-error.error';
import { UserNotFoundError } from 'src/domain/errors/users/user-not-found.error';
import { AuthenticationUserPayload } from 'src/domain/interfaces/authentication-user-payload';

export interface IAuthenticateUserDTO {
  email: string;
  password: string;
}

export type OAuthenticateUserDTO =
  | MissingParamError
  | UnexpectedError
  | UserNotFoundError
  | AuthenticationUserPayload;
