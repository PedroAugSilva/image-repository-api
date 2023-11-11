import { ICreateUserDTO, OCreateUserDTO } from './dto/create-user.dto';

export interface ICreateUserUseCase {
  execute(input: ICreateUserDTO): Promise<OCreateUserDTO>;
}
