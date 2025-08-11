import { AuthGuard } from "./auth.guard";
import { PermissionCheckGuard } from "./permission-check.guard";

export function auth(): string {
  return 'auth';
}

export { AuthGuard, PermissionCheckGuard };
