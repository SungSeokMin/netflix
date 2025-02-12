import { Provider } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from 'src/auth/guard/auth.guard';
import { RBACGuard } from 'src/auth/guard/rbac.guard';

const authGuard: Provider = {
  provide: APP_GUARD,
  useClass: AuthGuard,
};

const rbacGuard: Provider = {
  provide: APP_GUARD,
  useClass: RBACGuard,
};

const providers: Provider[] = [authGuard, rbacGuard];

export default providers;
