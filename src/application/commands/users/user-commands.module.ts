import { Module } from '@nestjs/common';
import { CreateUserController } from './create/create-user.controller';
import { CreateUserUseCase } from './create/create-user.use-case';
import { AuthenticateUserController } from './authenticate/authenticate-user.controller';
import { AuthenticateUserUseCase } from './authenticate/authenticate-user.use-case';
import { JwtModule } from '@nestjs/jwt';
import { jwtSecret } from 'src/domain/contants/jwt.constants';

@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: jwtSecret,
      signOptions: { expiresIn: '30d' },
    }),
  ],
  controllers: [CreateUserController, AuthenticateUserController],
  providers: [CreateUserUseCase, AuthenticateUserUseCase],
})
export class UserCommandsModule {}
