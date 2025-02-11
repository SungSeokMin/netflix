import {
  ClassSerializerInterceptor,
  Controller,
  Headers,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
@UseInterceptors(ClassSerializerInterceptor)
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  registerUser(@Headers('authorization') basicToken: string) {
    return this.authService.register(basicToken);
  }

  @Post('login')
  loginUser(@Headers('authorization') basicToken: string) {
    return this.authService.login(basicToken);
  }

  @Post('token/access')
  async rotateAccessToken(@Headers('authorization') refreshToken: string) {
    const payload = await this.authService.parseBearerToken(refreshToken, true);

    return {
      accessToken: await this.authService.issueToken(payload, false),
    };
  }
}
