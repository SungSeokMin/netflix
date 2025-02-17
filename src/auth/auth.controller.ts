import {
  ClassSerializerInterceptor,
  Controller,
  Headers,
  Post,
  Request,
  UseInterceptors,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { RequestWithUser } from './middleware/bearer-token.middleware';
import { Public } from './decorator/public.decorator';

@Controller('auth')
@UseInterceptors(ClassSerializerInterceptor)
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('register')
  registerUser(@Headers('authorization') basicToken: string) {
    return this.authService.register(basicToken);
  }

  @Public()
  @Post('login')
  loginUser(@Headers('authorization') basicToken: string) {
    return this.authService.login(basicToken);
  }

  @Post('token/access')
  async rotateAccessToken(@Request() request: RequestWithUser) {
    return {
      accessToken: await this.authService.issueToken(request.user, false),
    };
  }
}
