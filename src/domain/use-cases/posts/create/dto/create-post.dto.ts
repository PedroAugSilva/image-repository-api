import { MissingParamError } from 'src/domain/errors/shared/missing-param-error.error';
import { UnexpectedError } from 'src/domain/errors/shared/unexpected-error.error';
import { UserNotFoundError } from 'src/domain/errors/users/user-not-found.error';

export interface ICreatePostDTO {
  image: Express.Multer.File;
  body?: string;
  userUuid: string;
  tags?: {
    name: string;
    uuid: string;
  }[];
}

export type OCreatePostDTO =
  | MissingParamError
  | UnexpectedError
  | UserNotFoundError
  | void;
