import { Error } from 'src/infra/errors/shared/error.interface';

export class UnexpectedError implements Error {
  readonly name = 'UnexpectedError';
  readonly reason: string;

  constructor(error: any) {
    this.reason = '[Application Error]: An unexpected error occurred';
    console.log(`[Application Error]: An unexpected error occurred`);
    console.error(error);
  }
}
