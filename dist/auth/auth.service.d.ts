import { JwtService } from '@nestjs/jwt';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
import { UserService } from 'src/users/user.service';
export declare class AuthService {
    private usersService;
    private jwtService;
    private prisma;
    constructor(usersService: UserService, jwtService: JwtService, prisma: PrismaService);
    signIn(user: Prisma.UserUncheckedCreateInput): Promise<{
        accessToken: string;
    }>;
    registerUser(user: Prisma.UserUncheckedCreateInput): Promise<{
        accessToken: string;
    }>;
    generateJwt(payload: any): Promise<{
        accessToken: string;
    }>;
}
