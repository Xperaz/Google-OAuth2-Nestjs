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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma.service");
const auth_service_1 = require("./auth.service");
const google_oauth_guard_1 = require("./guards/google-oauth.guard");
let AuthController = exports.AuthController = class AuthController {
    constructor(authService, prisma) {
        this.authService = authService;
        this.prisma = prisma;
    }
    async loginGoogle(req) {
        return req.user;
    }
    async GoogleAuthCallback(req, res) {
        try {
            const result = await this.authService.signIn(req.user);
            const { accessToken } = result;
            res.cookie('token', accessToken, {
                httpOnly: false,
                sameSite: false,
            });
            res.cookie('_id', req.user.id, {
                httpOnly: false,
                sameSite: false,
            });
            if (req.user.logedFirstTime) {
                return res.redirect(`${process.env.AUTH_REDIRECT_LOGIN}`);
            }
            if (req.user.twoFA) {
                return res.redirect(`${process.env.AUTH_REDIRECT_2FA}`);
            }
            else {
                return res.redirect(`${process.env.AUTH_REDIRECT_URI}`);
            }
        }
        catch (error) {
            res.status(400).json(error);
        }
    }
    async logout(req, res) {
        await this.prisma.user.update({
            where: { email: req.user.email },
            data: {
                logedFirstTime: false,
            },
        });
        res.sendStatus(200);
    }
};
__decorate([
    (0, common_1.Get)('google'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "loginGoogle", null);
__decorate([
    (0, common_1.Get)('google/callback'),
    (0, common_1.UseGuards)(google_oauth_guard_1.GoogleOauthGuard),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "GoogleAuthCallback", null);
__decorate([
    (0, common_1.Get)('logout'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "logout", null);
exports.AuthController = AuthController = __decorate([
    (0, common_1.Controller)('auth'),
    __metadata("design:paramtypes", [auth_service_1.AuthService,
        prisma_service_1.PrismaService])
], AuthController);
//# sourceMappingURL=auth.controller.js.map