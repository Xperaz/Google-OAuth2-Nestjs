import { Injectable } from '@nestjs/common';
// import { PrismaService } from 'src/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { Prisma, User } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService, private jwtService: JwtService) {}

  async findOne(params: { id: string }): Promise<any> {
    const { id } = params;
    try {
      const user = await this.prisma.user.findUnique({
        where: { id },
      });
      if (!user) throw new Error('user not found');
      return user;
    } catch (error) {
      console.log('findOne error :', error.message);
      return null;
    }
  }
  async findOneLogin(params: { login: string }): Promise<User> {
    const { login } = params;
    return await this.prisma.user.findUnique({
      where: { login },
    });
  }

  async findAll(): Promise<User[]> {
    return this.prisma.user.findMany();
  }

  async create(data: Prisma.UserCreateInput): Promise<User> {
    return await this.prisma.user.create({
      data,
    });
  }

  async update(params: { id: string; data: UpdateUserDto }): Promise<User> {
    const { id, data } = params;

    return await this.prisma.user.update({
      data,
      where: { id },
    });
  }

  async remove(id: string): Promise<User> {
    return await this.prisma.user.delete({
      where: { id },
    });
  }

  isLoginValid(login: string): boolean {
    if (login.length < 6) return false;
    if (login.length > 8) return false;
    if (!login.match(/^[A-z][A-z0-9-_]{5,7}$/)) return false;
    return true;
  }
}
