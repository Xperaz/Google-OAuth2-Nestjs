import { JwtService } from '@nestjs/jwt';
import { Prisma, User } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
import { UpdateUserDto } from './dto/update-user.dto';
export declare class UserService {
    private prisma;
    private jwtService;
    constructor(prisma: PrismaService, jwtService: JwtService);
    findOne(params: {
        id: string;
    }): Promise<any>;
    findOneLogin(params: {
        login: string;
    }): Promise<User>;
    findAll(): Promise<User[]>;
    create(data: Prisma.UserCreateInput): Promise<User>;
    update(params: {
        id: string;
        data: UpdateUserDto;
    }): Promise<User>;
    remove(id: string): Promise<User>;
    isLoginValid(login: string): boolean;
}
