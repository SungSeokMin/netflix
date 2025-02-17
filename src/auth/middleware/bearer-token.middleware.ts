import { Cache, CACHE_MANAGER } from '@nestjs/cache-manager';
import {
  BadRequestException,
  Inject,
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { NextFunction, Request, Response } from 'express';
import { envVariableKeys } from 'src/common/const/env.const';

export interface RequestWithUser extends Request {
  user?: any;
}

@Injectable()
export class BearerTokenMiddleware implements NestMiddleware {
  constructor(
    @Inject(CACHE_MANAGER)
    private readonly cacheManager: Cache,
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
  ) {}

  async use(req: RequestWithUser, res: Response, next: NextFunction) {
    const header = req.headers['authorization'];

    if (!header) {
      next();
      return;
    }

    try {
      const token = this.validateBearerToken(header);

      const tokenKey = `TOKEN_${token}`;

      const cachedPayload = await this.cacheManager.get(tokenKey);

      if (cachedPayload) {
        req.user = cachedPayload;
        return next();
      }

      const decodedPayload = this.jwtService.decode(token);

      if (decodedPayload.type !== 'access' && decodedPayload.type !== 'refresh') {
        throw new UnauthorizedException('잘못된 토큰입니다.');
      }

      const secretKey =
        decodedPayload.type === 'refresh'
          ? envVariableKeys.refreshTokenSecret
          : envVariableKeys.accessTokenSecret;

      const payload = await this.jwtService.verifyAsync(token, {
        secret: this.configService.get<string>(secretKey),
      });

      /// payload['exp'] epoch time seconds
      const expiryDate = +new Date(payload['exp'] * 1000);
      const now = +Date.now();

      const diffrenceInSeconds = expiryDate - now / 1000;

      await this.cacheManager.set(tokenKey, payload, Math.max((diffrenceInSeconds - 30) * 1000, 1));

      req.user = payload;
      next();
    } catch (error) {
      if (error.name === 'TokenExpiredError') {
        throw new UnauthorizedException('토큰이 만료됐습니다.');
      }
      next();
    }
  }

  validateBearerToken(bearerToken: string) {
    const bearerSplit = bearerToken.split(' ');

    if (bearerSplit.length !== 2) {
      throw new BadRequestException('토큰 포맷이 잘못되었습니다.');
    }

    const [bearer, token] = bearerSplit;

    if (bearer.toLowerCase() !== 'bearer') {
      throw new BadRequestException('토큰 포맷이 잘못되었습니다.');
    }

    return token;
  }
}
