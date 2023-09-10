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
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const prisma_service_1 = require("../prisma.service");
let UserService = exports.UserService = class UserService {
    constructor(prisma, jwtService) {
        this.prisma = prisma;
        this.jwtService = jwtService;
    }
    async findOne(params) {
        const { id } = params;
        try {
            const user = await this.prisma.user.findUnique({
                where: { id },
            });
            if (!user)
                throw new Error('user not found');
            return user;
        }
        catch (error) {
            console.log('findOne error :', error.message);
            return null;
        }
    }
    async findOneLogin(params) {
        const { login } = params;
        return await this.prisma.user.findUnique({
            where: { login },
        });
    }
    async findAll() {
        return this.prisma.user.findMany();
    }
    async create(data) {
        return await this.prisma.user.create({
            data,
        });
    }
    async update(params) {
        const { id, data } = params;
        return await this.prisma.user.update({
            data,
            where: { id },
        });
    }
    async remove(id) {
        return await this.prisma.user.delete({
            where: { id },
        });
    }
    isLoginValid(login) {
        if (login.length < 6)
            return false;
        if (login.length > 8)
            return false;
        if (!login.match(/^[A-z][A-z0-9-_]{5,7}$/))
            return false;
        return true;
    }
};
exports.UserService = UserService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService, jwt_1.JwtService])
], UserService);
//# sourceMappingURL=user.service.js.map