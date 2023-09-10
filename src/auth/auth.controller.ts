import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Response } from 'express';
import { PrismaService } from 'src/prisma.service';
import { AuthService } from './auth.service';
import { GoogleOauthGuard } from './guards/google-oauth.guard';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private readonly prisma: PrismaService,
  ) {}
  @Get('google')
  async loginGoogle(@Req() req: any) {
    return req.user;
  }

  @Get('google/callback')
  @UseGuards(GoogleOauthGuard)
  async GoogleAuthCallback(@Req() req: any, @Res() res: Response) {
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
      } else {
        return res.redirect(`${process.env.AUTH_REDIRECT_URI}`);
      }
    } catch (error) {
      res.status(400).json(error);
    }
  }

  @Get('logout')
  // @UseGuards(JwtAuthGuard)
  async logout(@Req() req: any, @Res() res: Response): Promise<any> {
    await this.prisma.user.update({
      where: { email: req.user.email },
      data: {
        logedFirstTime: false,
      },
    });
    res.sendStatus(200);
  }
}
