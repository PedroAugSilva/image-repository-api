import { Injectable } from '@nestjs/common';
import { User } from 'src/domain/entities/user.entity';
import { IUsersResporitory } from 'src/domain/repositories/users/users.repository';
import { ApiPrismaClientService } from 'src/infra/prisma/prisma.service';

@Injectable()
export class PrismaUsersRepository implements IUsersResporitory {
  constructor(private readonly prisma: ApiPrismaClientService) {}
  async find(uuid: string): Promise<User | null> {
    const user = await this.prisma.user.findFirst({
      where: {
        uuid,
      },
    });

    if (!user) {
      return null;
    }

    return new User(user, user.uuid);
  }
  async save(input: User): Promise<void> {
    await this.prisma.user.create({
      data: {
        ...input,
      },
    });
  }
  async findUserByEmail(email: string): Promise<User | null> {
    const user = await this.prisma.user.findFirst({
      where: {
        email,
      },
    });
    if (!user) {
      return null;
    }
    return new User(user, user.uuid) || null;
  }
}
