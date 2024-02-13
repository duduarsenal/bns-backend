import { UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request, Response, NextFunction } from 'express';

export async function AuthMiddleware(req: Request, res: Response, next: NextFunction) {
  const access_token = req.headers?.authorization;
  const jwtService = new JwtService;

  if (!access_token) {
    throw new UnauthorizedException('Token não encontrado');
  }

  try {
    const payload = await jwtService.verifyAsync(access_token, {
      secret: process.env.SECRET,
    });
    
    req['user'] = payload;
  } catch {
    throw new UnauthorizedException('Token não autorizado');
  }
  return next();
}
