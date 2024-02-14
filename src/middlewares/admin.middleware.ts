import { UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request, Response, NextFunction } from 'express';

export async function AuthAdminMiddleware(req: Request, res: Response, next: NextFunction) {
  const access_token = req.headers?.authorization.split(' ')[1];
  const jwtService = new JwtService;

  if (!access_token) {
    throw new UnauthorizedException('Token não encontrado');
  }

  try {
    const payload = await jwtService.verifyAsync(access_token, {
      secret: process.env.SECRET,
    });

    const { perm } = payload;

    if(perm != 'adm') throw new UnauthorizedException('Sem autorização suficiente');

    req['user'] = payload;
  } catch (error) {
    throw new UnauthorizedException(error.message || 'Token não autorizado');
  }
  return next();
}
