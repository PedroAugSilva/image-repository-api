import { ICreateUserDTO, OCreateUserUseCaseDTO } from './dto/create-user.dto';

export interface ICreateUserUseCase {
  execute(input: ICreateUserDTO): Promise<OCreateUserUseCaseDTO>;
}
