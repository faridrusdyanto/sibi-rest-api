import { Injectable, NotFoundException, ConflictException, HttpException, HttpStatus } from '@nestjs/common';
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

  async findAll() {
    const data = await this.prisma.role.findMany()
    return data;
  }

  async findOne(id: number) {
    const data = await this.prisma.role.findUnique({
      where: {
        id
      }
    })
    if (data) {
      return data;
    }
    throw new NotFoundException("Data not found")
  }
  
  async findByName(name: string) {
    const role = await this.prisma.role.findUnique({
      where: {
        name
      }
    });

    return role
  }

  async update(id: number, updateRoleDto: UpdateRoleDto) {
    const checkdata = await this.findOne(id)
    if (!checkdata) {
      return checkdata
    }
    try {
      const role = await this.prisma.role.update({
        where: { id },
        data: updateRoleDto
      })
      const responseMessage = 'Data update successful';
      return { message: responseMessage, role };
    } catch (err) {
      console.error(err);
      throw new HttpException('Internal Server Error', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async remove(id: number) {
    const checkdata = await this.findOne(id)
    if (!checkdata) {
      return checkdata
    }
    await this.prisma.role.delete({ where: { id } })
    return { message: "Delete data successfully "}
  }
}
