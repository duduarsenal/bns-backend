import { UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request, Response, NextFunction } from 'express';

export async function AuthMiddleware(req: Request, res: Response, next: NextFunction) {
  const access_token: string = req.headers?.authorization?.includes("Bearer") 
      ? req.headers?.authorization?.split(' ')[1] 
      : req.headers?.authorization;
  const jwtService = new JwtService;

  if (!access_token) {
    throw new UnauthorizedException('Token Inválido');
  }

  try {
    const payload: any = await jwtService.verifyAsync(access_token, {
      secret: process.env.SECRET,
    });
    
    if(!payload) throw new UnauthorizedException('Não Autorizado');

    req['user'] = payload;
  } catch {
    throw new UnauthorizedException('Não Autorizado');
  }
  return next();
}
