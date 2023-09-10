import { PrismaService } from 'src/prisma.service';
export type JwtPayload = {
    login: string;
    email: string;
    avatar: string;
    name: string;
    banner: string;
    id: number;
    intraId: number;
    userId: string;
};
declare const JwtStrategy_base: new (...args: any[]) => any;
export declare class JwtStrategy extends JwtStrategy_base {
    private prisma;
    constructor(prisma: PrismaService);
    validate(payload: JwtPayload): Promise<{
        id: string;
        login: string;
        email: string;
        password: string;
        name: string;
        kind: string;
        avatar: string;
        bg_color: string[];
        paddle_color: string;
        ball_color: string;
        status: string;
        TotalWin: number;
        TotalLose: number;
        TotalDraw: number;
        cleanSheet: boolean;
        Machine: boolean;
        TotalMatch: number;
        Level: number;
        location: string;
        intraId: number;
        banner: string;
        is_active: boolean;
        created_at: Date;
        updated_at: Date;
        twoFactorAuthenticationSecret: string;
        twoFA: boolean;
        logedFirstTime: boolean;
    } | {
        login: string;
        email: string;
        avatar: string;
        name: string;
        banner: string;
        id: string;
        intraId: number;
    }>;
}
export {};
