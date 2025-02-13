import { Provider } from '@nestjs/common';
import { APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { AuthGuard } from 'src/auth/guard/auth.guard';
import { RBACGuard } from 'src/auth/guard/rbac.guard';
import { ResponseTimeInterceptor } from 'src/common/interceptor/response-time.interceptor';

const guards: Provider[] = [
  {
    provide: APP_GUARD,
    useClass: AuthGuard,
  },
  {
    provide: APP_GUARD,
    useClass: RBACGuard,
  },
];

const interceptors: Provider[] = [
  {
    provide: APP_INTERCEPTOR,
    useClass: ResponseTimeInterceptor,
  },
];

const providers: Provider[] = [...guards, ...interceptors];

export default providers;
