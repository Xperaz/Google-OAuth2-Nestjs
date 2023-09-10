"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const prisma_service_1 = require("../prisma.service");
const user_service_1 = require("../users/user.service");
let AuthService = exports.AuthService = class AuthService {
    constructor(usersService, jwtService, prisma) {
        this.usersService = usersService;
        this.jwtService = jwtService;
        this.prisma = prisma;
    }
    async signIn(user) {
        const userExists = await this.usersService.findOne({
            id: user.id,
        });
        if (!userExists) {
            return await this.registerUser(user);
        }
        return this.generateJwt({
            login: userExists.login,
            email: userExists.email,
            avatar: userExists.avatar,
            name: userExists.name,
            banner: userExists.banner,
            userId: userExists.id,
            intraId: userExists.intraId,
            logedFirstTime: userExists.logedFirstTime,
        });
    }
    async registerUser(user) {
        try {
            const newUser = await this.prisma.user.create({
                data: {
                    login: user.login,
                    email: user.email,
                    avatar: user.avatar,
                    name: user.name,
                    banner: user.banner,
                    intraId: user.intraId,
                    logedFirstTime: user.logedFirstTime,
                },
            });
            return await this.generateJwt({
                login: newUser.login,
                email: newUser.email,
                avatar: newUser.avatar,
                name: newUser.name,
                userId: newUser.id,
                banner: newUser.banner,
                intraId: newUser.intraId,
                logedFirstTime: newUser.logedFirstTime,
            });
        }
        catch (error) {
            console.log(error);
        }
    }
    async generateJwt(payload) {
        return {
            accessToken: await this.jwtService.signAsync(payload),
        };
    }
};
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [user_service_1.UserService,
        jwt_1.JwtService,
        prisma_service_1.PrismaService])
], AuthService);
//# sourceMappingURL=auth.service.js.map