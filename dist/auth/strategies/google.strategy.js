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
exports.GoogleStrategy = void 0;
const passport_1 = require("@nestjs/passport");
const passport_google_oauth20_1 = require("passport-google-oauth20");
const common_1 = require("@nestjs/common");
const auth_service_1 = require("../auth.service");
const prisma_service_1 = require("../../prisma.service");
const user_service_1 = require("../../users/user.service");
let GoogleStrategy = exports.GoogleStrategy = class GoogleStrategy extends (0, passport_1.PassportStrategy)(passport_google_oauth20_1.Strategy, 'google') {
    constructor(authService, prisma, userService) {
        super({
            clientID: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            callbackURL: process.env.GOOGLE_CALLBACK_URI,
            scope: ['profile', 'email'],
        });
        this.authService = authService;
        this.prisma = prisma;
        this.userService = userService;
    }
    async validate(_accessToken, _refreshToken, profile) {
        const { id, name, emails, photos, login, location, intraId, kind } = profile;
        if (!login && !location && !intraId && !kind) {
            const newLogin = generateRandomUsername(profile._json.given_name, profile._json.family_name);
            profile._json.login = newLogin;
            profile._json.location = 'Unavailable';
            profile._json.intraId = null;
            profile._json.kind = 'google';
        }
        const _UserExist = await this.prisma.user.findUnique({
            where: { email: profile._json.email },
        });
        console.log('user exist: ', _UserExist);
        if (!_UserExist) {
            const newUser = await this.prisma.user.create({
                data: {
                    login: profile._json.login,
                    email: profile._json.email,
                    avatar: profile._json.picture,
                    name: `${profile._json.given_name} ${profile._json.family_name}`,
                    banner: '',
                    kind: profile._json.kind,
                    intraId: null,
                    location: profile._json.location,
                    logedFirstTime: true,
                },
            });
            return newUser;
        }
        else {
            return _UserExist;
        }
    }
};
exports.GoogleStrategy = GoogleStrategy = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [auth_service_1.AuthService,
        prisma_service_1.PrismaService,
        user_service_1.UserService])
], GoogleStrategy);
function generateRandomUsername(firstName, lastName) {
    const maxUsernameLength = 8;
    const randomNum = Math.floor(Math.random() * 99);
    const username = (firstName.slice(0, Math.min(2, firstName.length)) +
        lastName.slice(0, 4) +
        randomNum).toLowerCase();
    return username.slice(0, maxUsernameLength);
}
//# sourceMappingURL=google.strategy.js.map