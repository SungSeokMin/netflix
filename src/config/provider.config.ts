import { Provider } from '@nestjs/common';
import { APP_FILTER, APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { AuthGuard } from 'src/auth/guard/auth.guard';
import { RBACGuard } from 'src/auth/guard/rbac.guard';
import { ForbiddenExceptionFilter } from 'src/common/filter/forbidden.filter';
import { QueryFailedErrorFilter } from 'src/common/filter/query-failed.filter';
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

const exceptionFilters: Provider[] = [
  {
    provide: APP_FILTER,
    useClass: ForbiddenExceptionFilter,
  },
  {
    provide: APP_FILTER,
    useClass: QueryFailedErrorFilter,
  },
];

const providers: Provider[] = [...guards, ...interceptors, ...exceptionFilters];

export default providers;
