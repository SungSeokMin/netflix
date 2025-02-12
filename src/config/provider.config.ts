import { Provider } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from 'src/auth/guard/auth.guard';

const authGuard: Provider = {
  provide: APP_GUARD,
  useClass: AuthGuard,
};

const providers: Provider[] = [authGuard];

export default providers;
