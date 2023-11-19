import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class RoleService {
  constructor(private prisma: PrismaService) {}
  
  async create(dto: CreateRoleDto) {
    const checkRole = await this.findByName(dto.name)
    if (checkRole) {
      throw new ConflictException('Role duplicated')
    }

    const data = await this.prisma.role.create({
      data: {...dto}
    });

    const responseMessage = 'Successfully added role';
    return { message: responseMessage, data };
  }

  findAll() {
    return `This action returns all role`;
  }

  findOne(id: number) {
    return `This action returns a #${id} role`;
  }
  
  async findByName(name: string) {
    const role = await this.prisma.role.findUnique({
      where: {
        name
      }
    });

    return role
  }

  update(id: number, updateRoleDto: UpdateRoleDto) {
    return `This action updates a #${id} role`;
  }

  remove(id: number) {
    return `This action removes a #${id} role`;
  }
}
