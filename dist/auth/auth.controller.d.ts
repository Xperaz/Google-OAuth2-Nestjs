import { Response } from 'express';
import { PrismaService } from 'src/prisma.service';
import { AuthService } from './auth.service';
export declare class AuthController {
    private authService;
    private readonly prisma;
    constructor(authService: AuthService, prisma: PrismaService);
    loginGoogle(req: any): Promise<any>;
    GoogleAuthCallback(req: any, res: Response): Promise<void>;
    logout(req: any, res: Response): Promise<any>;
}
