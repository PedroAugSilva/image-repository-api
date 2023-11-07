import {
  IAuthenticateUserDTO,
  OAuthenticateUserDTO,
} from './dto/authenticate-user.dto';

export interface IAuthenticateUserUseCase {
  execute(input: IAuthenticateUserDTO): Promise<OAuthenticateUserDTO>;
}
