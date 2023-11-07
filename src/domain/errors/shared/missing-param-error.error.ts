import { Error } from 'src/infra/errors/shared/error.interface';

export class MissingParamError implements Error {
  readonly name: string = 'Missing Param Error';
  readonly reason: string;
  constructor(param: string) {
    this.reason = `[Missing Param Error]: the param '${param}' is missing`;
  }
}
