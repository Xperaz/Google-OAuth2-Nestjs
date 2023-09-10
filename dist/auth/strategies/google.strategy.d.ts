import { Strategy } from 'passport-google-oauth20';
import { AuthService } from '../auth.service';
import { PrismaService } from 'src/prisma.service';
import { UserService } from 'src/users/user.service';
declare const GoogleStrategy_base: new (...args: any[]) => Strategy;
export declare class GoogleStrategy extends GoogleStrategy_base {
    private readonly authService;
    private readonly prisma;
    private readonly userService;
    constructor(authService: AuthService, prisma: PrismaService, userService: UserService);
    validate(_accessToken: string, _refreshToken: string, profile: any): Promise<any>;
}
export {};
