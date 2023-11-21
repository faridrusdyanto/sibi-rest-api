import { Injectable, ConflictException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma.service';
import { hash } from 'bcrypt';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async register(dto: CreateUserDto) {
    const checkEmail = await this.findByEmail(dto.email)
    if (checkEmail) {
      throw new ConflictException('Email duplicated')
    }
    const user = await this.prisma.user.create({
      data: {
        ...dto,
        password: await hash(dto.password, 10)
      }
    });

    const { password, ...userWithoutPassword } = user;
    const responseMessage = 'User successfully registered';
    return { message: responseMessage, data: userWithoutPassword };
  }

  create(createUserDto: CreateUserDto) {
    return 'This action adds a new user';
  }

  async findAll() {
    const data = await this.prisma.user.findMany({
      include: { roleAccess: true },
    })
    return data;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  async findByEmail(email: string) {
    const data = await this.prisma.user.findUnique({
      where: {
        email
      }
    })
    return data;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
