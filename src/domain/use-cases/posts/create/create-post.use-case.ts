import { ICreatePostDTO, OCreatePostDTO } from './dto/create-post.dto';

export interface ICreatePostUseCase {
  execute(input: ICreatePostDTO): Promise<OCreatePostDTO>;
}
