import {
  Body,
  Controller,
  ForbiddenException,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { AuthorizationGuard } from 'src/application/common/guards/authorization.guard';
import { ICreatePostDTO } from 'src/domain/use-cases/posts/create/dto/create-post.dto';
import { CreatePostUseCase } from './create-post.use-case';
import { MissingParamError } from 'src/domain/errors/shared/missing-param-error.error';
import { UserNotFoundError } from 'src/domain/errors/users/user-not-found.error';
import { UnexpectedError } from 'src/domain/errors/shared/unexpected-error.error';

@UseGuards(AuthorizationGuard)
@Controller('posts')
export class CreatePostController {
  constructor(private readonly createPostUseCase: CreatePostUseCase) {}

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  async handle(
    @Body() input: Omit<ICreatePostDTO, 'imageUrl'>,
    @UploadedFile() file: Express.Multer.File,
  ) {
    const result = await this.createPostUseCase.execute({
      userUuid: input.userUuid,
      image: file,
    });

    if (result instanceof MissingParamError) {
      throw result;
    }
    if (result instanceof UserNotFoundError) {
      throw result;
    }
    if (result instanceof UnexpectedError) {
      throw new ForbiddenException();
    }
    return result;
  }
}
