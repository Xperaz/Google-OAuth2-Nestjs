import { ConfigType } from '@nestjs/config';
import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Request } from 'express';
import { ParamsDictionary } from 'express-serve-static-core';
import { ParsedQs } from 'qs';
import * as dotenv from 'dotenv';
import { PrismaService } from 'src/prisma.service';
dotenv.config();

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

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(private prisma: PrismaService) {
    const extractJwtFromCookie = (
      req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>,
    ) => {
      let token = null;
      if (req && req.cookies) {
        token = req.cookies['token'];
      }
      return token || ExtractJwt.fromAuthHeaderAsBearerToken()(req);
    };
    super({
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET,
      jwtFromRequest: extractJwtFromCookie,
    });
  }

  async validate(payload: JwtPayload) {
    console.log('from validate');
    const user = await this.prisma.user.findUnique({
      where: { email: payload.email },
    });

    if (!user) throw new UnauthorizedException('Please log in to continue');
    if (!user.twoFA) return user;

    return {
      login: payload.login,
      email: payload.email,
      avatar: payload.avatar,
      name: payload.name,
      banner: payload.banner,
      id: user.id,
      intraId: payload.intraId,
    };
  }
}
