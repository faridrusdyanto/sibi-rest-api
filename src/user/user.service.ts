import { Injectable, ConflictException, NotFoundException, HttpException, HttpStatus } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma.service';
import { hash } from 'bcrypt';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) { }

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

  async findOne(id: number) {
    // return `This action returns a #${id} user`;
    const data = await this.prisma.user.findUnique({
      where: {
        id
      }
    })
    if (data) {
      return data;
    }
    throw new NotFoundException("User data not found")
  }

  async findByEmail(email: string) {
    const data = await this.prisma.user.findUnique({
      where: {
        email
      }
    })
    return data;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const checkdata = await this.findOne(id)
    if (!checkdata) {
      return checkdata
    }
    try {
      const user = await this.prisma.user.update({
        where: { id },
        data: updateUserDto
      })
      const { password, ...userWithoutPassword } = user
      const responseMessage = 'Data update successful';
      return { message: responseMessage, data: userWithoutPassword };
    } catch (err) {
      console.error(err);
      throw new HttpException('Internal Server Error', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
